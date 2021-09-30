
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
import { accentColor, darkPlainText, grayBg, darkGrayText, grayBorder } from '../../utils/xbaseInterface.d';
import { acc } from 'react-native-reanimated';

export const FilterListStyles = StyleSheet.create({
    loading: {
        marginTop: 30,
        marginBottom: 40,
    },
    no_content: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 60, 
        marginHorizontal: 40
    },
    no_content_description: { 
        marginTop: 20, 
        fontSize: 16,
    },
    no_content_button: {
        fontSize: 16,
        margin: 20,
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: accentColor,
        borderRadius: 50,
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    button_text: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
    },
    header: {
        backgroundColor: 'white',        
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: 'gray',
        elevation: 5,
    },
    sub_header: {
        height :30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sub_header_count: {
        fontSize: 14,
        height : 20,
        width: '100%',
        paddingRight: 100,
        marginLeft: 20,
        color: darkGrayText,
        fontWeight: '600',
        // backgroundColor: 'red',
    },
    item_mode_touch: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 100,
        top: -3,
        // backgroundColor: 'green'
        // top: 11,
    },
    item_mode_icon: {
        width: 36,
        height: 36,
        // marginBottom: 2,
    },
    sort_text_touch: {
        position: 'absolute',
        right: 10,
        fontSize: 14,
        color: accentColor,
    },
    sort_text: {
        fontSize: 14,
        color: accentColor,
    },
    close_sort_sheet_button: {
        fontSize: 16,
        margin: 20,
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: accentColor,
        borderRadius: 50,
        marginBottom: 60,
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});