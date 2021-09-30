
import {
    StyleSheet,
} from 'react-native';

import { accentColor, darkPlainText, grayBg, darkGrayText } from '../../utils/xbaseInterface.d';

export const FilterStyles = StyleSheet.create({
    filter_container_search: { 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    filter_container_insertion: { 
        flex: 1,
    },
    filter_item: {
        padding: 16,
        // backgroundColor: 'green'
    },
    filter_group: {
        borderBottomWidth: 16,
        borderColor: grayBg,
    },
    filter_group_duo: {
        borderBottomWidth: 16,
        borderColor: grayBg,
        // flexDirection: 'row',
    },
    filter_item_key: {
        fontSize: 16,
        color: darkPlainText,
        backgroundColor: 'white',
    },
    filter_item_value: {
        fontSize: 15,
        marginTop: 8,
        color: accentColor,
        backgroundColor: 'white',
    },
    filter_item_value_all: {
        fontSize: 15,
        marginTop: 8,
        color: darkGrayText,
        backgroundColor: 'white',
    },
    filter_item_value_all_for_duo_items: {
        fontSize: 15,
        color: darkGrayText,
        position: 'absolute',
        left: 0,
        // top: -2,
    },
    filter_item_duo: {
        marginTop: 8,
        position: 'relative',
        flexDirection: 'row',
        // backgroundColor: 'lightgray',
    },
    filter_item_button_label: {
        marginRight: 12,
        fontSize: 15,
    },
    filter_item_input_text: { 
        paddingTop: 30, 
        flex: 1, 
        backgroundColor: '#fff' 
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
        marginLeft: 12,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    suggestion_icon: {
        height: 20,
        width: 20,
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
    accent_text: {
        color: darkPlainText,
    },
    white_text: {
        color: 'white',
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
    },
    reset_link: {
        marginTop: 20,
        fontSize: 15,
        color: accentColor,
    }
});