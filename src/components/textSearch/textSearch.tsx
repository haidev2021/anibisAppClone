
import React, { useRef, useCallback, Fragment, useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, TouchableOpacity, Dimensions, ActivityIndicator, TextInput, Platform, Keyboard
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fLog } from '../../utils/utils';
import { TextSearchStyles } from './textSearchStyles';
import { suggestionIcon, searchHistoryIcon, ic_back_black, ic_x_black, ic_back_dark } from '../../utils/assetHelper';
import { CategorySectionTitle } from '../categoryModal/categorySectionTitle';
import { TextHistoryHeader } from './textHistoryHeader';
import { grayBg, darkPlainText } from '../../utils/xbaseInterface.d';
import { useSelector } from 'react-redux';
import { trans } from '../../utils/common';

export interface ITextSearch {
    value: string;
    onChange: (params: any) => void;
    onSearchTextCommit: (term: string) => void;
    onFocus: () => void;
    btnText: string;
    onCancel: () => void;
    showHistoryTerms: boolean;
    searchTermFlag: boolean;
    navigation: any;
}

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
    const index = arr.indexOf(value);
    if (index > -1)
        arr.splice(index, 1);
    return arr;
}

export function TextSearch(props: ITextSearch) {
    const TAG = "TextSearch"
    const searchBarRef = useRef(null);
    const texts = useSelector(state => state.localization.texts)
    const { value, onChange, onSearchTextCommit, btnText,
        onFocus, onCancel, showHistoryTerms, searchTermFlag,
        navigation } = props;
    const [historiedTerms, setHistoriedTerms] = useState<string[]>([]);

    const deleteData = useCallback(async () => {
        try {
            const jsonValue = await AsyncStorage.removeItem('@historied_terms_key')
            setHistoriedTerms([]);
        } catch (e) {
            // error reading value
        }
    }, []);

    const getData = useCallback(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@historied_terms_key')
            fLog(TAG, 'getData jsonValue = ', jsonValue);
            setHistoriedTerms(jsonValue != null ? JSON.parse(jsonValue) : []);
        } catch (e) {
            setHistoriedTerms([]);
        }
    }, [setHistoriedTerms]);

    const storeData = useCallback(async (terms) => {
        try {
            let jsonToSave = JSON.stringify(terms);
            await AsyncStorage.setItem('@historied_terms_key', jsonToSave)
        } catch (e) {
            // saving error
        }
    }, [value, historiedTerms]);
    const excuteAndAddNewHistoryItem = useCallback((item: string) => {
        onSearchTextCommit(item);
        const ref = searchBarRef.current
        if (Platform.OS === 'ios' && ref)
            ref.unFocus()
        if (item && item.trim().length > 0) {
            let newArray = historiedTerms.slice();
            removeItem(newArray, item);
            newArray = [item, ...newArray]
            setHistoriedTerms(newArray)
            storeData(newArray);
        }
    }, [searchBarRef, historiedTerms, onSearchTextCommit])

    const onSearchButtonPress = useCallback(() => {
        fLog(TAG, 'onSearchButtonPress = ');
        excuteAndAddNewHistoryItem(value);
    }, [value, historiedTerms, searchBarRef, onSearchTextCommit])

    useEffect(() => {
        getData();
        if (searchTermFlag) {
            const ref = searchBarRef.current
            if (ref)
                ref.focus()
        }
    }, [])
    // fLog(TAG, 'historiedTerms = ', historiedTerms);
    const onHistoryTermPress = useCallback((item) => {
        Keyboard.dismiss();
        onChange(item);
        fLog(TAG, 'onHistoryTermPress item = ', item);
        excuteAndAddNewHistoryItem(item);
    }, [historiedTerms, searchBarRef, onSearchTextCommit])

    const onDeletePress = useCallback(() => {
        onChange("");
        const ref = searchBarRef.current
        if (ref)
            ref.focus()
    }, [onChange])

    const search_input_container_style = Platform.OS === 'ios' ? TextSearchStyles.search_input_container_ios : TextSearchStyles.search_input_container_android
    const search_input_sub_container_style = Platform.OS === 'ios' ? TextSearchStyles.search_input_sub_container_ios : TextSearchStyles.search_input_sub_container_android
    const search_bar_style = Platform.OS === 'ios' ? TextSearchStyles.search_bar_ios : TextSearchStyles.search_bar_android
    return <Fragment>
        <View style={search_input_container_style}>
            {/* <View style={search_input_sub_container_style}> */}
            {Platform.OS === 'ios' ? <SearchBar
                style={TextSearchStyles.search_bar_ios}
                ref={searchBarRef}
                placeholder={trans("apps.searchkeyword", texts)}
                text={value}
                onChangeText={onChange}
                onSearchButtonPress={onSearchButtonPress}
                onCancelButtonPress={onCancel}
                onFocus={onFocus}
                cancelButtonText={trans("apps.action.cancel", texts)}
                enablesReturnKeyAutomatically={false}
                onBlur={() => { fLog(TAG, ' onBlur ',); }}
                //
                // textFieldBackgroundColor={'white'}
                textColor={darkPlainText}
            /> : <View style={TextSearchStyles.search_bar_android}>
                    <TouchableOpacity style={TextSearchStyles.back_touch} onPress={navigation.goBack}>
                        <Image style={TextSearchStyles.back_icon} source={ic_back_dark}></Image>
                    </TouchableOpacity>
                    <TextInput
                        ref={searchBarRef}
                        style={TextSearchStyles.text_search_input_android}
                        value={value}
                        onChangeText={onChange}
                        underlineColorAndroid='transparent'
                        returnKeyType='search'
                        onSubmitEditing={onSearchButtonPress}
                        onFocus={onFocus} 
                        placeholder={trans("apps.searchkeyword", texts)}/>
                    <TouchableOpacity
                        onPress={onDeletePress}
                        style={StyleSheet.compose(TextSearchStyles.search_text_delete_touch, { display: value ? 'flex' : 'none' })}>
                        <Image style={TextSearchStyles.search_text_delete_icon} source={ic_x_black}></Image>
                    </TouchableOpacity>
                </View>
            }
            {/* </View> */}
        </View>
        <View style={{ display: showHistoryTerms ? 'flex' : 'none', height: 40, flex: 1 }}>
            {historiedTerms.length > 0 &&
                <TextHistoryHeader
                    name={trans("apps.history", texts)}
                    actionText={trans("apps.action.delete", texts)}
                    onActionPress={deleteData} />}
            {/* {historiedTerms.map(item => <Text>{item}</Text>)} */}
            {/* <ScrollView style={TextSearchStyles.history_scroll}> */}
            {historiedTerms && historiedTerms.map((item: string) => {
                return <TouchableOpacity style={TextSearchStyles.suggestion_touch}
                    onPress={() => { onHistoryTermPress(item) }}>
                    <Image style={TextSearchStyles.suggestion_icon} source={searchHistoryIcon}></Image>
                    <Text style={TextSearchStyles.suggestion_gray}>
                        {item}
                    </Text>
                </TouchableOpacity>
            })}
            {/* </ScrollView> */}
        </View>
    </Fragment>
}