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

export interface IFullWidthButton {
    style?: any,
    text: string;
    onPress: () => void;
    isPrimary?: boolean;
    isRoundCorner?: boolean;
    textColor?: string;
}
export default function FullWidthButton({ style, text, onPress, isPrimary, isRoundCorner, textColor}: IFullWidthButton) {
    const composedStyle = StyleSheet.compose(isPrimary ? Styles.full_width_button_primary : Styles.full_width_button, isRoundCorner ? Styles.round_corner : {})
    return <TouchableOpacity style={StyleSheet.compose(composedStyle, style)} onPress={onPress}>
        <Text style={StyleSheet.compose(isPrimary ? Styles.button_text_primary : Styles.button_text, textColor ? {color: textColor} : {})}>{text}</Text>
    </TouchableOpacity>
}