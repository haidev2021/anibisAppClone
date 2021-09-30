// import { Route, Switch, NavLink, Link } from 'react-router-dom'
import React, { Component, useState, useEffect, useLayoutEffect, useRef, useCallback, Fragment, useContext, Dispatch, SetStateAction } from 'react';
// import Axios from 'axios';
// import { getInputClassName } from '../insert/helper/insertHelper';
import { XBASE_LOCATION_SUGGESTION_API } from '../../utils/network';
// import { ValidationContext } from '../../screens/insert/insert';
// import { RootContext } from '../../root';
import { trans } from '../../utils/common';
import { IRootContext, accentColor } from '../../utils/xbaseInterface.d';
import { IOnLocationSuggestSuccess, IOnError, IFetchLocationSuggestParam } from '../../redux/actions/action.d';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocationSuggestAction } from '../../redux/actions/actionsLocationSuggest';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AttributeStyles } from './attribute/attributeStyles';
import { FilterStyles } from './filterStyles';
import { suggestionIcon } from '../../utils/assetHelper';
import { FocusableInput } from '../../sharedcomponents/focusableInput/focusableInput';

export interface ILocationSearch {
    onChange: Dispatch<SetStateAction<string>>;
    value: string;
    isSearch: boolean;
}
export function LocationSearchController(props: ILocationSearch) {
    const { onChange, value, isSearch } = props;
    const validationContext = { isValidating: false };//useContext(ValidationContext);
    const rootContext = { language: "de", commonTexts: null };//: IRootContext = useContext(RootContext);
    const [locationSuggestions, setLocationSuggestions] = useState<Array<string> | null>(null);
    const [location, setLocation] = useState(null);
    const locationRef = useRef(null);
    const dispatch = useDispatch();
    const texts = useSelector(state => state.localization.texts);
    
    const onSuggestionClick = useCallback(loc => {
        // const loc = e.target.getAttribute('data-click')
        setLocation(loc);
        onChange(loc);
        setLocationSuggestions(null);
    }, [onChange]);

    useEffect(() => {
        setLocation(value);
    }, [value])

    const onLocationChange = useCallback(value => {
        setLocation(value);
        locationRef.current = value
        const requestTrigger = value;
        if (!requestTrigger) {
            setLocationSuggestions(null);
            onChange(null);
        } else {
            setTimeout(function () {
                if (locationRef.current === requestTrigger) {
                    let onSuccess: IOnLocationSuggestSuccess = function (data: string[]) {
                        console.log(`/fetchLocationSuggestAction IOnLocationSuggestSuccess data`, data)
                        setLocationSuggestions(data);
                    }
                    let onError: IOnError = function (error: string) {
                        console.log("POST '/fetchLocationSuggestAction' onError:", error);
                    }
                    let param: IFetchLocationSuggestParam = {
                        language: rootContext.language,
                        prefix: requestTrigger
                    };
                    dispatch(fetchLocationSuggestAction(param, onSuccess, onError))
                }
            }, 750);
        }
    }, [location, onChange, rootContext.language]);

    let label = <Text>{trans("apps.location", texts)}</Text>;
    // let TextInputClassName = isSearch ? "large" : getInputClassName(!location ? value : location, validationContext.isValidating, true);

    // if (isSearch)
    let suggestionsContainerStyle = StyleSheet.compose(
        FilterStyles.suggestions_container,
        { display: (locationSuggestions && locationSuggestions.length > 0) ? 'flex' : 'none' })

    return <Fragment>
        {/* <Text style={FilterStyles.filter_item_key}>{label}</Text> */}
        {/* <TextInput className="TextInputClassName" value={location} onValueChange={onLocationChange} autoComplete="off"></TextInput> */}
        <View style={FilterStyles.filter_item_input_text}>
            <FocusableInput
                label={trans("apps.location", texts)}
                value={location ? location : ""}
                onValueChange={onLocationChange}
            />
            <View
                style={suggestionsContainerStyle}>
                {locationSuggestions && locationSuggestions.map((item: string) => {
                    return <TouchableOpacity style={FilterStyles.suggestion_touch} onPress={() => onSuggestionClick(item)}>
                        <Image style={FilterStyles.suggestion_icon} source={suggestionIcon}></Image>
                        <Text style={FilterStyles.suggestion_gray}>
                            {item.substring(0, location ? location.length : 0)}
                            <Text style={FilterStyles.suggestion_black} data-click={item} >
                                {item.substring(location ? location.length : 0, item.length)}
                            </Text>
                        </Text>
                    </TouchableOpacity>
                })}
            </View>
        </View>

        <TouchableOpacity onPress={() => onChange(null)}>
            <Text style={FilterStyles.reset_link}>{trans("apps.action.reset", texts)}</Text>
        </TouchableOpacity>
    </Fragment>
}