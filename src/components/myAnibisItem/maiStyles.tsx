

import {
    StyleSheet, Platform,
} from 'react-native';
import { accentColor, grayBg, grayBorder, graySeparator, darkGrayText } from '../../utils/xbaseInterface.d';

export const MAIStyles = StyleSheet.create({
    container: {
    },
    touch: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    icon: {
        width: 46,
        height: 46,
    },
    tint_icon: {
        width: 50,
        height: 50,
        tintColor: accentColor,
    },
    label: {
        flex: 1,
        color: accentColor,
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 20,
    },
    count: {
        color: darkGrayText,
        fontSize: 16,
    },
    separator: {
        alignSelf: 'stretch',
        marginHorizontal: 20,
        backgroundColor: graySeparator,
        paddingHorizontal: 20,
        height: 1,
    }
});