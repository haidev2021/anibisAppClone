
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
import { accentColor } from '../../utils/xbaseInterface.d';

export const Styles = StyleSheet.create({
    modal_container: {
        flex: 1,
        backgroundColor: accentColor,
    },
    modal_content_center_anchored: {
        flex: 1,
        backgroundColor: 'white',
    },
    modal_header: {
        flexDirection: 'row',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        textAlign: 'right',
        height: 56,
        // verticalAlign: 'middle',
        paddingRight: 8,
        backgroundColor: accentColor,
        alignItems: 'center',
    },
    close_icon_touch: {
        width: 40,
        height: 56,
        marginLeft: 20,
        justifyContent: 'center',
    },
    closeIcon: {
        height: 15,
        width: 15,
    },
    modal_title: {
        marginLeft: 15,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    simple_link_x_mark: {
        width: '100%',
        marginTop: 30,
        elevation: 2,
        padding: 10,
    },
    modal_chunk_hide_bottom_button: {
        // padding: 20,
        backgroundColor: 'white',
    },
    modal_chunk: {
        // padding: 20,
        paddingBottom: 80,
        backgroundColor: 'white',
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
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: accentColor,
        borderRadius: 50,
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center'
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
    button_text: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
    }
});