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
import { Styles } from './styles';
import LowerCasedLink from '../../sharedcomponents/button/lowerCasedLink';
import { trans } from '../../utils/common';

export interface IDetailAbuseReportProps {
    advert: IXBaseAdvert;
    lng: TLanguage;
    texts: TTextPack;
}

export default function DetailAbuseReport(props: IDetailAbuseReportProps) {
    const { advert, lng, texts} = props;
    const onReportPress = useCallback(() => {
    }, [])
    return <View style={Styles.description_container}>
        <Text style={Styles.section_title}>{trans("apps.supiciouslisting", texts)}</Text>
        <LowerCasedLink style={Styles.starting_text} text={trans("apps.action.reportfraud", texts)} onPress={onReportPress}></LowerCasedLink>
        <LowerCasedLink style={Styles.starting_text} text={trans("apps.action.showsecurityhint", texts)} onPress={onReportPress}></LowerCasedLink>
    </View>
}