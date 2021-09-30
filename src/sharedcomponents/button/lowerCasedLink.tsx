
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

export interface ILink {
    style?: any;
    text: string;
    onPress: () => void;
}
export default function LowerCasedLink(props: ILink) {
    const { style, text, onPress } = props;
    return <TouchableOpacity style={style} onPress={onPress}>
            <Text style={StyleSheet.compose(Styles.lower_case_link_text, style)}>{text}</Text>
        </TouchableOpacity>
}