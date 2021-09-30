
import {
    StyleSheet,
} from 'react-native';

import { accentColor, darkPlainText, grayBg, darkGrayText, grayBorder } from '../../utils/xbaseInterface.d';

export const FIStyles = StyleSheet.create({
    filter_item_input_text: { 
        paddingTop: 30, 
        flex: 1, 
        backgroundColor: '#fff' 
    },
    containerStyleBlur: {
        borderWidth: 2,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: grayBorder,
        borderRadius: 5,
        height: 50,        
    },
    containerStyleFocus: {
        borderWidth: 2,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: accentColor,
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
    eye_icon: {
        width: 30,
        height: 30,
        tintColor: accentColor,
    },
});