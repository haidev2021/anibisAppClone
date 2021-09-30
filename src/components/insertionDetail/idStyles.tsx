

import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet, Platform,
} from 'react-native';
import { INSERTION_ITEM_WIDTH, INSERTION_ITEM_HEIGHT } from '../advertLists/styles';
import { darkPlainText, darkGrayText, darkerGrayBg } from '../../utils/xbaseInterface.d';

export const IDStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    insertion_item: {
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    insertion_thumb: {
        width: 128,
        height: 99,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        margin: 10,
    },
    noThumb: {
        width: 64,
        height: 48,
    },
    insertion_texts: {
        overflow: 'hidden',
        width: INSERTION_ITEM_WIDTH - 148,
        height: 111,
        padding: 10,
        // backgroundColor: 'green',
    },
    insertion_title: {
        width: '100%',
        fontSize: 16,
        color: darkPlainText,
        marginRight: 10,
        fontWeight: 'bold',
        paddingRight: 25,
    },
    insertion_price: {
        width: '100%',
        fontSize: 14,
        color: darkPlainText,
        fontWeight: 'bold',
        marginTop: 12,
    },
    insertion_statistic: {
        position: 'absolute',
        width: '100%',
        fontSize: 12,
        color: darkGrayText,
        bottom: 4,
        left: 10,
    },
    insertion_date_state: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: 32,
        width: '100%',
        bottom: 0,
        backgroundColor: darkerGrayBg,
    },
    insertion_date: {
        color: darkGrayText,
        flex: 1,
        marginHorizontal: 10,
        fontSize: 13,
    },
    insertion_state: {
        marginHorizontal: 3,
        color: 'white',
        fontSize: 13,
        // fontWeight: 'bold'
    },
    insertion_state_border: {
        borderRadius: 3,
        padding: 2,
        marginRight: 10,
        justifyContent: 'center',
    },
    button_container: { 
        padding: 20 
    },
});