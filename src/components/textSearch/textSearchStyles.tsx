

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
import { accentColor, darkPlainText, grayBg, darkGrayText } from '../../utils/xbaseInterface.d';

export const TextSearchStyles = StyleSheet.create({
    search_input_container_android: {
        // flexDirection: 'row',
        backgroundColor: accentColor,
        padding: 8,
        paddingHorizontal: 16,
        height: 56
        
    },
    search_input_sub_container_android: {
        // flexDirection: 'row',
        backgroundColor: 'white',
        padding: 2,
        height: 44,
        borderRadius: 5,
    },
    search_input_container_ios: {
        // flexDirection: 'row',
        // backgroundColor: accentColor,
        // padding: 10,
        height: 60,
        width: '100%'
    },
    search_input_sub_container_ios: {
        // flexDirection: 'row',
        // backgroundColor: accentColor,
        // padding: 10,
        height: 60,
        width: '100%'
    },
    search_bar_ios: { 
        height: 60, 
        width: '100%' 
    },
    search_bar_android: { 
        flexDirection: 'row',
        height: 40, 
        width: '100%', 
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        // paddingLeft: 40
    },
    back_touch: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    search_text_delete_touch: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    search_text_delete_icon: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back_icon: {
        width: 16,
        height: 16,
    },
    text_search_input_android: {
        fontSize: 16,
        color: darkPlainText,
        flex: 1,
        // backgroundColor: 'green',
        height: 44,
        paddingTop: 10,
    },
    history_header: {
        flexDirection: 'row',
        // backgroundColor: 'green'
    },
    filter_group: {
        borderBottomWidth: 16,
        borderColor: grayBg,
    },
    suggestion_gray: {
        fontSize: 15,
        marginLeft: 12,
        color: darkGrayText,
        // backgroundColor: 'yellow'
    },
    suggestion_black: {
        fontSize: 15,
        color: darkPlainText,
        fontWeight: '600'
    },
    suggestion_touch: {
        marginTop: 0,
        marginLeft: 20,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    suggestion_icon: {
        height: 16,
        width: 19,
    },
    suggestions_container: {
        backgroundColor: '#fff',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        borderRadius: 5,
        shadowColor: 'gray'
    },
    history_scroll: {
        flex: 1,
        backgroundColor: 'white'
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'dimgray',
        margin: 10,
    },
    category_section_title: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    section_title: {
        position: 'absolute',
        height: 50,
        top: 10,
        color: darkGrayText,
        fontSize: 16,
        left: 20,
    },
    section_action_text: {
        position: 'absolute',
        right: 20,
        top: 10,
        textTransform: 'uppercase',
        color: accentColor,
        fontSize: 16,
    }
});