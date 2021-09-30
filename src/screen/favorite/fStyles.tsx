
import React from 'react';
import {
    StyleSheet,
} from 'react-native';
export const FStyles = StyleSheet.create({
    header: {
        // width: 20,
        // height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
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
    header_text: {
        flex: 1,
        // backgroundColor: 'yellow',
    },
    login_button_container: {
        // width: 100,
        // height: 20,
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    login_button: {
        // width: 20,
        // height: 20,
        marginTop: 0,
        paddingHorizontal: 10,
    },
    edit: {
        width: 20,
        height: 20,
    },
});
