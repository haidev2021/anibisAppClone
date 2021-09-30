

import React, { useState, useEffect, useCallback } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal,
} from 'react-native';
import { accentColor, darkPlainText, grayBg, darkGrayText, grayBorder } from '../../../utils/xbaseInterface.d';

export const AttributeStyles = StyleSheet.create({
    text_input: {
        // padding: 16,
        // backgroundColor: 'green'
        borderWidth: 1,
        borderColor: 'black'
    },
    containerStyles: {
        borderWidth: 2,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: grayBorder,
        borderRadius: 5,
        height: 50,        
    },
    labelStyles: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
    }, 
    inputStyles: {
        color: darkPlainText,
        paddingHorizontal: 10,
        fontSize: 15,
    }, 
});