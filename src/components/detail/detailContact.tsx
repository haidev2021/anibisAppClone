import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, Dimensions,
} from 'react-native';
import { IXBaseAdvert, TLanguage, XBasePictureS, TTextPack } from '../../utils/xbaseInterface.d';
import { favoriteButtonOff, viewFullImageIcon, contactEmailIcon, contactPhoneIcon, contactSmsIcon } from '../../utils/assetHelper';
import { Styles } from './styles';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import Carousel from 'react-native-snap-carousel';
import { SERVER } from '../../utils/network';
import FastImage from 'react-native-fast-image'
import UpperCasedLink from '../../sharedcomponents/button/upperCasedLink';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import MapView from 'react-native-maps';
import LowerCasedLink from '../../sharedcomponents/button/lowerCasedLink';
import FullWidthRightIconButton from '../../sharedcomponents/button/fullWidthRightIconButton';
import { trans } from '../../utils/common';
import { IOnError } from '../../redux/actions/action.d';
import { fLog } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { resetUserListingListAction, fetchUserListingListIdsAction } from '../../redux/actions/actionsUserListingList';

export interface IDetailContactProps {
    advert: IXBaseAdvert;
    lng: TLanguage;
    texts: TTextPack;
    navigation: any;
}

export default function DetailContact(props: IDetailContactProps) {
    const { advert, lng, texts, navigation} = props;
    const dispatch = useDispatch()
    const TAG = "userListing"

    const onUserPress = useCallback(() => {

    }, [])

    const onUserListingPress = useCallback(() => {
        let onError: IOnError = function (error: string) {
            fLog(TAG, "error:", error);
        }
        // dispatch(resetUserListingListAction())
        dispatch(fetchUserListingListIdsAction({
            language: "de",
            userId: advert.user._id,
        }, onError))

        navigation.navigate('UserListing');

    }, [])

    const onCallPress = useCallback(() => {

    }, [])
    return <View style={Styles.description_container}>
        <Text style={Styles.section_title}>{trans("apps.action.contactseller", texts)}</Text>
        <LowerCasedLink style={Styles.starting_text} text={advert.user.email} onPress={onUserPress}></LowerCasedLink>
        <Text style={Styles.starting_plain_text}>{trans("apps.registeredsince", texts)} {advert.user.memberSince}</Text>
        <LowerCasedLink style={Styles.starting_text} text={trans("apps.action.showmorelistings", texts)} onPress={onUserListingPress}></LowerCasedLink>
        <View style={Styles.phone_sms_container}>
            <View style={Styles.phone_container}>
                <FullWidthRightIconButton text={advert.contactAddress.phone} onPress={onCallPress}
                    icon={contactPhoneIcon} iconWidth={20} iconHeight={20} isPrimary={true}></FullWidthRightIconButton>
            </View>
            <View style={Styles.sms_container}>
                <FullWidthRightIconButton text={"SMS"} onPress={onCallPress}
                    icon={contactSmsIcon} iconWidth={21} iconHeight={20} isPrimary={true}></FullWidthRightIconButton>
            </View>
        </View>
        <FullWidthRightIconButton text={trans("apps.action.contactemail", texts)} onPress={onCallPress}
            icon={contactEmailIcon} iconWidth={22} iconHeight={18} isPrimary={true}></FullWidthRightIconButton>
    </View>
}