
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, TouchableOpacity
} from 'react-native';
import { IXBaseAdvert, TLanguage } from '../../utils/xbaseInterface.d';
import { favoriteButtonOff, ic_ext_link } from '../../utils/assetHelper';
import { Styles } from './styles';

export interface ILink {
    text: string;
    onPress: () => void;
    style?: any;
    isWebsiteLink?: boolean;
}
export default function UpperCasedLink(props: ILink) {
    const { text, onPress, style,isWebsiteLink } = props;
    return <TouchableOpacity style={StyleSheet.compose(Styles.upper_case_link, style)} onPress={onPress}>
            <Text style={Styles.upper_case_link_text}>{text}</Text>
            {isWebsiteLink && <Image  style={Styles.upper_case_link_icon} source={ic_ext_link}/>}
        </TouchableOpacity>
}