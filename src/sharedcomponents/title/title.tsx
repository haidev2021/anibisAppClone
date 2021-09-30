
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    Text, StyleSheet,
} from 'react-native';
import { IXBaseAdvert, TLanguage } from '../../utils/xbaseInterface.d';
import { favoriteButtonOff } from '../../utils/assetHelper';
import { TStyles } from './tStyles';

export interface ITitle {
    text: string;
    style?: any;
}
export default function Title(props: ITitle) {
    const { text, style } = props;
    return <Text style={StyleSheet.compose(TStyles.title, style)}>{text}</Text>
}