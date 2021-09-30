
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    Text, StyleSheet,
} from 'react-native';
import { IXBaseAdvert, TLanguage } from '../../utils/xbaseInterface.d';
import { favoriteButtonOff } from '../../utils/assetHelper';
import { PTStyles } from './ptStyles';

export interface IPlainText {
    text: string;
    style?: any;
}
export default function PlainText(props: IPlainText) {
    const { text, style } = props;
    return <Text style={StyleSheet.compose(PTStyles.plain_text, style)}>{text}</Text>
}