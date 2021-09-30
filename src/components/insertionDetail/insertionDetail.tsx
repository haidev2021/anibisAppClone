
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, Dimensions, TouchableOpacity, Alert,
} from 'react-native';
import { TXBaseAttributes, IXBaseAdvert, TLanguage, IInsertionUpdateParam, IInsertionDeleteParam } from '../../utils/xbaseInterface.d';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { SERVER } from '../../utils/network';
import { noPictureImage } from '../../utils/assetHelper';
import { trans, formatDate } from '../../utils/common';
import { IDStyles } from './idStyles';
import { getStateColor, getStateText, STATE_TO_APPROVE, STATE_ACTIVE, STATE_DEACTAVATED } from '../../utils/advertState';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import { updateInsertionListAdvertAction, resetInsertionListAction, fetchInsertionListIdsAction, deleteInsertionListAdvertAction, promoteInsertionListAdvertAction } from '../../redux/actions/actionsInsertionList';
import { fLog } from '../../utils/utils';
import { IOnError, IOnSuccessNoContent } from '../../redux/actions/action.d';
import { fetchGalleryIdsAction } from '../../redux/actions/actionsGalleryList';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export interface IInsertionDetailProps {
    children?: any;
    insertion: IXBaseAdvert;
    navigation: any;
}


function showButtonUpdate(isSuccessInsertion: boolean | undefined, state: number | undefined, accountRole: string): boolean {
    return !isSuccessInsertion && state !== STATE_TO_APPROVE && accountRole != "admin"
};
function showButtonPromote(isSuccessInsertion: boolean | undefined, state: number | undefined, accountRole: string): boolean {
    return state === STATE_ACTIVE && accountRole != "admin"
};
function showButtonEnable(isSuccessInsertion: boolean | undefined, state: number | undefined, accountRole: string): boolean {
    return !isSuccessInsertion && state === STATE_DEACTAVATED && accountRole != "admin"
};
function showButtonDisable(isSuccessInsertion: boolean | undefined, state: number | undefined, accountRole: string): boolean {
    return !isSuccessInsertion && state === STATE_ACTIVE && accountRole != "admin"
};
function showButtonDelete(isSuccessInsertion: boolean | undefined, state: number | undefined, accountRole: string): boolean {
    return !isSuccessInsertion && accountRole != "admin"
};
function showButtonApprove(isSuccessInsertion: boolean | undefined, state: number | undefined, accountRole: string): boolean {
    return !isSuccessInsertion && state === STATE_TO_APPROVE && accountRole == "admin"
};
function showButtonReject(isSuccessInsertion: boolean | undefined, state: number | undefined, accountRole: string): boolean {
    return !isSuccessInsertion && state === STATE_TO_APPROVE && accountRole == "admin"
};

export default function InsertionDetail(props: IInsertionDetailProps) {
    const { insertion, navigation, children } = props;
    const texts = useSelector(state => state.localization.texts)
    const language = useSelector(state => state.localization.language)
    const accountRole = useSelector(state => state.authentication.role)
    const dispatch = useDispatch();
    const TAG = "insert"
    const onAdvertClick = useCallback(() => {
        navigation.navigate('SingleDetail', { detail: insertion });
    }, [insertion]);

    const onEnDisableClick = useCallback(function () {
        if (insertion) {
            let newState = insertion.state === STATE_DEACTAVATED ? STATE_ACTIVE : STATE_DEACTAVATED;

            let onError: IOnError = function (error: string) {
                Alert.alert("error", "" + error, [{ text: trans("apps.action.ok", texts), onPress: () => { } }]);
            }

            let param: IInsertionUpdateParam = { id: insertion._id as string, set: { state: newState } }
            dispatch(updateInsertionListAdvertAction(param, onError))
        }
    }, [insertion]);

    const onDeleteConfirmClick = useCallback(function () {
        if (insertion) {
            let onError: IOnError = function (error: string) {
                Alert.alert("error", "" + error, [{ text: trans("apps.action.ok", texts), onPress: () => { } }]);
            }
            let param: IInsertionDeleteParam = { id: insertion._id as string }
            dispatch(deleteInsertionListAdvertAction(param, onError))
        }
    }, [insertion]);


    const onDeleteClick = useCallback(() => {
        Alert.alert(trans("apps.deletethislisting", texts), trans("apps.message.deletelisting", texts),
            [{ text: trans("apps.action.cancel", texts), onPress: () => { } },
            { text: trans("apps.action.ok", texts), onPress: onDeleteConfirmClick },]
        );
    }, [insertion])


    const onPromoteClick = useCallback(() => {
        if (insertion) {
            let onError: IOnError = function (error: string) {
                Alert.alert(
                    "error",
                    "" + error,
                    [{ text: trans("apps.action.ok", texts), onPress: () => { } }]
                );
            }
            let onSuccess: IOnSuccessNoContent = function () {
                Alert.alert(
                    "",
                    "Gallery Promotion Success!",
                    [{
                        text: trans("apps.action.ok", texts), onPress: () => {
                            let onGalleryIdsError: IOnError = function (error: string) {
                                fLog(TAG, "POST '/lastestOffers' ERROR:", error);
                            }
                            dispatch(fetchGalleryIdsAction(onGalleryIdsError))
                        }
                    }]
                );
            }
            let param: IInsertionDeleteParam = { id: insertion._id as string }
            dispatch(promoteInsertionListAdvertAction(param, onError, onSuccess))
        }
    }, [insertion]);
    
    const onEditPress = useCallback(() => {
        navigation.navigate('EditInsertion', { editInsertion: insertion });
    },[],)
    
    return <View style={IDStyles.container}>
        <TouchableOpacity onPress={onAdvertClick} style={IDStyles.insertion_item}>
            {insertion.thumbnail && <FastImage
                style={IDStyles.insertion_thumb}
                source={{
                    uri: SERVER + "/blogPhotosThumbnail/" + insertion.thumbnail,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />}
            {!insertion.thumbnail && <View style={IDStyles.insertion_thumb}>
                <Image source={noPictureImage} style={IDStyles.noThumb}></Image>
            </View>}
            <View style={IDStyles.insertion_texts}>
                <Text numberOfLines={1} style={IDStyles.insertion_title}>{insertion.title}</Text>
                <Text numberOfLines={1} style={IDStyles.insertion_price}>{insertion.price}</Text>
                <Text numberOfLines={1} style={IDStyles.insertion_statistic}>{insertion.hits} {trans('apps.statsviews', texts)}, {insertion.contacts} {trans('apps.statsrequests', texts)}</Text>
            </View>
        </TouchableOpacity>
        <View style={IDStyles.button_container}>
            {showButtonUpdate(children, insertion.state, accountRole) &&
                <FullWidthButton text={trans("apps.action.edit", texts)} onPress={onEditPress} isPrimary={true} />}
            {showButtonPromote(children, insertion.state, accountRole) &&
                <FullWidthButton text={trans("apps.action.upgradead", texts)} onPress={onPromoteClick} isPrimary={false} />}
            {showButtonDisable(children, insertion.state, accountRole) &&
                <FullWidthButton text={trans("apps.action.pause", texts)} onPress={onEnDisableClick} isPrimary={false} />}
            {showButtonEnable(children, insertion.state, accountRole) &&
                <FullWidthButton text={trans("apps.action.activate", texts)} onPress={onEnDisableClick} isPrimary={false} />}
            {showButtonDelete(children, insertion.state, accountRole) &&
                <FullWidthButton textColor="crimson" text={trans("apps.action.deletelisting", texts)} onPress={onDeleteClick} isPrimary={false} />}
            {showButtonApprove(children, insertion.state, accountRole) &&
                <FullWidthButton text={trans("apps.action.approve", texts)} onPress={() => { }} isPrimary={false} />}
            {showButtonReject(children, insertion.state, accountRole) &&
                <FullWidthButton textColor="crimson" text={trans("apps.action.reject", texts)} onPress={() => { }} isPrimary={false} />}
            {children}
        </View>
        <View style={IDStyles.insertion_date_state}>
            <Text style={IDStyles.insertion_date}>{trans('apps.datecreate', texts)} {formatDate(insertion.posted)}</Text>
            <View style={StyleSheet.compose(IDStyles.insertion_state_border, { backgroundColor: getStateColor(insertion.state) })}>
                <Text style={IDStyles.insertion_state}>{trans(getStateText(insertion.state), texts)}</Text>
            </View>
        </View>
    </View >
}