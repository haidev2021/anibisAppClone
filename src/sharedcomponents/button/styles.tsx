
import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import { accentColor, grayBg, darkGrayText } from '../../utils/xbaseInterface.d';

export const Styles = StyleSheet.create({
    full_width_button_primary: {
        width: '100%',
        // margin: 20,
        height: 36,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: accentColor,
        borderRadius: 3,
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: 'lightgray',
        elevation: 5,
    },
    full_width_button: {
        width: '100%',
        // margin: 20,
        height: 36,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: 'lightgray',
        elevation: 5,
    },
    round_corner: {
        borderRadius: 20,
    },
    button_text_primary: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: '500',
    },
    button_text: {
        fontSize: 16,
        color: accentColor,
        textTransform: 'uppercase',
        fontWeight: '500',
    },
    upper_case_link: {
        flexDirection: 'row'
    },
    upper_case_link_text: {
        // marginTop: 8,
        fontSize: 16,
        fontWeight: '600',
        color: accentColor,
        textTransform: 'uppercase',
    },
    upper_case_link_icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
        tintColor: accentColor,
    },
    lower_case_link_text: {
        fontSize: 16,
        color: accentColor,
    },
    text_right_icon_container: {
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    right_icon_button_text: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: '500',
        marginRight: 20,
        // backgroundColor: 'green'
    },
    right_icon: {
        position: "absolute",
        right: 10,
        // width: 20,
        // height: 20,
    },
});