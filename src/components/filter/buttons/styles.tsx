

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
import { accentColor, darkPlainText } from '../../../utils/xbaseInterface.d';

export const Styles = StyleSheet.create({
    filter_button_scroll: {
        marginTop: 6,
        backgroundColor: 'white',
    },
    all_filter_button: {
        height: 36,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center',
        paddingLeft: 7,
        paddingRight: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginLeft: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    filter_item_button: {
        // width: '90%',
        // margin: 10,
        height: 36,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center',
        paddingLeft: 13,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginLeft: 10,
        flexDirection: 'row',
    },
    all_filter_icon: { 
        width: 20, 
        height: 20 
    },
    accent_bg: {
        backgroundColor: accentColor,
        paddingRight: 9,
    },
    white_bg: {
        backgroundColor: 'white',
        // paddingRight: 12,
    },
    filter_item_button_label: {
        marginRight: 12,
        fontSize: 15,
        // backgroundColor: 'green',
    },
    accent_text: {
        color: darkPlainText,
    },
    white_text: {
        color: 'white',
    },
    all_filter_text_touch: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
    },
    all_filter_text: {
        fontSize: 15,
        color: accentColor,
        margin: 7,
        marginLeft: 10,
    },
    close_icon: {
        width: 18,
        height: 18,
        tintColor: 'white'
    }
});