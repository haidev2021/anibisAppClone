
import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import { grayBg, darkGrayText, accentColor } from '../../utils/xbaseInterface.d';

export const Styles = StyleSheet.create({
    category_list: {
        // backgroundColor: 'cyan'
    },
    parent_category: {
        flexDirection: 'row',
        height: 56,
        lineHeight: 32,
        left: 24,
        position: 'relative',
    },
    sub_category: {
        flexDirection: 'row',
        height: 56,
        lineHeight: 32,
        marginLeft: 20,
        left: 24,
        position: 'relative',
    },
    thin_no_margin: {
        height: 0,
    },
    category_name: {
        color: '#333333',
        fontSize: 16,
        lineHeight: 16,
        fontWeight: "400",
    },
    category_name_selected: {
        color: accentColor,
        fontSize: 16,
        lineHeight: 16,
        fontWeight: "400",
    },
    category_texts_container: {
        flex: 1,
        marginRight: 80,
        justifyContent: 'center',
    },
    sub_title: {
        color: 'gray',
        fontSize: 13,
        lineHeight: 16,
        fontWeight: "400",
        marginTop: 4,
    },
    category_selected_icon: {
        position: 'absolute',
        width: 22,
        height: 22,
        marginTop: 14,
        right: 50,        
    },
    category_exapnd_icon: {
        position: 'absolute',
        width: 8,
        height: 12,
        marginTop: 14,   
        right: 55,           
    },
    modal_footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    modal_footer_button: {
        width: '90%',
        margin: 20,
        height: 40,
        fontSize: 20,
    },
    lastSearchContainer: {
        width: '100%',
    },
    favoriteContainer: {
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'dimgray',
        margin: 10,
    },
    category_section_title: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: grayBg,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    section_title: {
        position: 'absolute',
        height: 50,
        top: 28,
        color: darkGrayText,
        fontSize: 16,
        left: 20,
    },
    section_action_text: {
        position: 'absolute',
        right: 20,
        top: 28,
        textTransform: 'uppercase',
        color: accentColor,
        fontSize: 16,
    }
});