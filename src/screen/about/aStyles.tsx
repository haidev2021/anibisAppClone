import {
    StyleSheet,
} from 'react-native';
import { graySeparator, darkGrayText } from '../../utils/xbaseInterface.d';

export const AStyles = StyleSheet.create({
    about_screen: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1
    },
    about_item: {
        width: '100%',
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        height: 56,
        borderBottomColor: graySeparator,
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    link: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        // backgroundColor: 'red',
    },
    link_icon: {
        width: 20, 
        height: 20
    },
    goto_web: {
        marginTop: 20,
        color: darkGrayText,
    },
})