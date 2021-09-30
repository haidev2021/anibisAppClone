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
import { favoriteButtonOff } from '../../utils/assetHelper';
import { Styles } from './styles';

export interface IFullWidthRightIconButton {
    style?: any,
    text: string;
    icon: any,
    iconWidth: number, 
    iconHeight: number, 
    onPress: () => void;
    isPrimary?: boolean;
}
export default function FullWidthRightIconButton(props: IFullWidthRightIconButton) {
    const { style, text, icon, iconWidth, iconHeight, onPress, isPrimary} = props;
    return <TouchableOpacity style={StyleSheet.compose(isPrimary ? Styles.full_width_button_primary : Styles.full_width_button, style)} onPress={onPress}>
        <View style={Styles.text_right_icon_container}>
            <Text style={Styles.right_icon_button_text}>{text}</Text>
            <Image style={StyleSheet.compose({width: iconWidth, height: iconHeight}, Styles.right_icon)} source={icon}/>
        </View>
    </TouchableOpacity>
}