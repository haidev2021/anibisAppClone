import React from 'react';
import {
    StyleSheet, Dimensions,
} from 'react-native';
import { grayBg, darkerGrayText, darkGrayText } from '../../../utils/xbaseInterface.d';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const PSStyles = StyleSheet.create({
    img_add_image: {
        width: 100,
        height: 80,
    },
    image_gallery_container: {
        width: viewportWidth,
        height: viewportWidth * 3 / 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: grayBg,
    },
    button_add_image: {
        position: 'absolute',
        width: viewportWidth - 40,
        bottom: 20,
    },
    button_publish: {
        position: 'absolute',
        bottom: 0,
    },
    buffer: {
        width: 0,
        height: 40,
    },
    index_indicator: {
        position: 'absolute',
        backgroundColor: '#ffffff99',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
        top: 20,
        left: 20,
        height: 25,
        justifyContent: 'center',
    },
    index_indicator_text: {
        fontSize: 14,
    },
    edit_touch: {
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: '#ffffff99',
        paddingRight: 5,
        paddingLeft: 10,
        paddingVertical: 3,
        borderRadius: 20,
        top: 20,
        right: 20,
        height: 25,
        alignItems: 'center',
    },
    edit_touch_text: {
        fontSize: 14,
    },
    ic_edit_image: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    bottom_sheet: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    edit_picture_title: {
        fontWeight: 'bold',
        marginBottom: 20,
        color: darkGrayText,
    },
    bottom_sheet_menu: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    ic_bottom_sheet_set_main_pic: {
        width: 25,
        height: 25,
        marginRight: 30,
    },
    ic_bottom_sheet_delete_black: {
        width: 21,
        height: 27,
        marginLeft: 2,
        marginRight: 32,
    },
    ic_bottom_sheet_photo_camera_black: {
        width: 30,
        height: 27,
        marginRight: 30,
    },
    ic_bottom_sheet_photo_library_black: {
        width: 30,
        height: 30,
        marginRight: 30,
    },
});