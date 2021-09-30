
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    Text, StyleSheet, View, Image, TextStyle,
} from 'react-native';
import { IXBaseAdvert, TLanguage, TTextPack } from '../../utils/xbaseInterface.d';
import { favoriteButtonOff, ic_error } from '../../utils/assetHelper';
import { MAStyles } from './maStyles';
import { trans } from '../../utils/common';
import { useSelector } from 'react-redux';

export interface IPlainText {
    text?: string;
    style?: any;
}
export default function MandatoryAlertMark(props: IPlainText) {
    const { text, style } = props;
    const texts = useSelector(state => state.localization.texts);
    return <View style={MAStyles.alert_container}>
        <Text style={StyleSheet.compose(MAStyles.alert_text, style)}>{text || trans('apps.checkmandatoryfield', texts)}</Text>
        <Image source={ic_error} style={MAStyles.ic_error}></Image>
    </View>
}