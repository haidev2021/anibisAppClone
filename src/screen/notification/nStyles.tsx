import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import { graySeparator } from '../../utils/xbaseInterface.d';
export const NStyles = StyleSheet.create({
    safe_view: { 
        flex: 1,
        backgroundColor: 'white'
    },
    container: { 
        padding: 20,
    },
    title: {
        marginTop: 40,
    },
    message: {
        marginTop: 16,
    },
    separator: {
        marginTop: 25,
        width: '100%',
        height: 1,
        backgroundColor: graySeparator,
    },
    label: {
        width: 20,
        height: 20,
    },
    edit: {
        width: 20,
        height: 20,
    },
});