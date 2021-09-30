import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { accentColor, darkPlainText, darkGrayText, grayShadow, blackShadow, darkerGrayText, grayBg, darkerGrayBg } from '../../utils/xbaseInterface.d';
import { fLog } from '../../utils/utils';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export const THIN_ITEM_WIDTH = 128;
export const THIN_ITEM_HEIGHT = 172;
export const MEDIUM_ITEM_WIDTH = viewportWidth - 20;
export const MEDIUM_ITEM_HEIGHT = 111;
export const FAT_ITEM_WIDTH = viewportWidth - 20;
export const FAT_ITEM_HEIGHT = 320;
export const INSERTION_ITEM_WIDTH = viewportWidth;
export const INSERTION_ITEM_HEIGHT = 151;
export const ITEM_HORIZONTAL_MARGIN = 10;
export const ITEM_VERTICAL_MARGIN = 10;
export const SHADOW_VISIBILITY_WIDTH = 10;
export const HEADER_PLUS_STATUS_BAR_HEIGHT = 200;
export const VERTICAL_LIST_HEIGHT = viewportHeight - HEADER_PLUS_STATUS_BAR_HEIGHT;
export const THIN_ITEMS_PER_SCREEN_WIDTH = viewportWidth / THIN_ITEM_WIDTH;
export const FAT_ITEMS_PER_SCREEN_HEIGHT = VERTICAL_LIST_HEIGHT / FAT_ITEM_HEIGHT;
export const MEDIUM_ITEMS_PER_SCREEN_HEIGHT = VERTICAL_LIST_HEIGHT / MEDIUM_ITEM_HEIGHT;
export const INSERTION_ITEMS_PER_SCREEN_HEIGHT = VERTICAL_LIST_HEIGHT / INSERTION_ITEM_HEIGHT;
const Styles = StyleSheet.create({
    item_bg_and_shadow_ios: {
        backgroundColor: '#fff',
        marginLeft: 10,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        borderRadius: 5,
        shadowColor: grayShadow,
        position: 'relative',
    },
    item_bg_and_shadow_android: {
        backgroundColor: '#fff',
        marginLeft: 10,
        borderRadius: 5,
        shadowColor: blackShadow,
        position: 'relative',
        elevation: 2,
    },
    item: {
        width: THIN_ITEM_WIDTH,
        height: THIN_ITEM_HEIGHT,
    },
    fat_item: {
        width: FAT_ITEM_WIDTH,
        height: FAT_ITEM_HEIGHT,
        borderRadius: 8,
    },
    fat_info: {
        marginLeft: 0,
        position: 'relative'
    },
    medium_item: {
        width: FAT_ITEM_WIDTH,
        flexDirection: 'row',
        borderRadius: 8,
    },
    insertion_item: {
        backgroundColor: 'white',
        width: INSERTION_ITEM_WIDTH,
        height: INSERTION_ITEM_HEIGHT,
        flexDirection: 'row',
    },
    thumb: {
        width: 128,
        height: 96,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
    },
    meidum_thumb: {
        width: 148,
        height: 111,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
    },
    insertion_thumb: {
        width: 128,
        height: 99,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        margin: 10,
    },
    noThumb: {
        width: 64,
        height: 48,
    },
    fat_thumb: {
        width: '100%',
        height: 195,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
    },
    fat_noThumb: {
        width: 96,
        height: 72,
    },
    AdvertListAdvertItemDivThumb: {

    },
    texts: {
        overflow: 'hidden',
        width: '100%',
        height: 72,
        padding: 8,
    },
    medium_texts: {
        overflow: 'hidden',
        width: MEDIUM_ITEM_WIDTH - 148,
        height: 111,
        padding: 10,
    },
    insertion_texts: {
        overflow: 'hidden',
        width: INSERTION_ITEM_WIDTH - 148,
        height: 111,
        padding: 10,
        // backgroundColor: 'green',
    },
    insertion_date_state: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: 32,
        width: '100%',
        bottom: 0,
        backgroundColor: darkerGrayBg,
    },
    insertion_date: {
        color: darkGrayText,
        flex: 1,
        marginHorizontal: 10,
        fontSize: 13,
    },
    insertion_state: {
        marginHorizontal: 3,
        color: 'white',
        fontSize: 13,
        // fontWeight: 'bold'
    },
    insertion_state_border: {
        borderRadius: 3,
        padding: 2,
        marginRight: 10,
        justifyContent: 'center',
    },
    fat_texts: {
        overflow: 'hidden',
        width: '100%',
        height: 125,
        padding: 15,
        paddingHorizontal: 20,
        // backgroundColor: 'green',
    },
    title: {
        width: '100%',
        fontSize: 13,
        color: accentColor,
        // backgroundColor: 'blue',
    },
    price: {
        marginTop: 4,
        width: '100%',
        fontSize: 13,
        color: darkPlainText,
        // backgroundColor: 'yellow',
    },
    medium_title: {
        width: '100%',
        fontSize: 16,
        color: darkPlainText,
        // backgroundColor: 'yellow',
        marginRight: 10,
        fontWeight: 'bold',
        paddingRight: 25,
    },
    medium_address: {
        width: '100%',
        marginTop: 8,
        fontSize: 13,
        color: darkGrayText,
        // backgroundColor: 'yellow',
    },
    medium_price: {
        width: '100%',
        marginTop: 26,
        fontSize: 14,
        color: darkPlainText,
        // backgroundColor: 'yellow',
        fontWeight: 'bold'
    },
    insertion_title: {
        width: '100%',
        fontSize: 16,
        color: darkPlainText,
        marginRight: 10,
        fontWeight: 'bold',
        paddingRight: 25,
    },
    insertion_price: {
        width: '100%',
        fontSize: 14,
        color: darkPlainText,
        fontWeight: 'bold',
        marginTop: 12,
    },
    insertion_statistic: {
        position: 'absolute',
        width: '100%',
        fontSize: 12,
        color: darkGrayText,
        // backgroundColor: 'green',
        bottom: 4,
        left: 10,
    },
    fat_title: {
        width: '100%',
        fontSize: 20,
        color: darkPlainText,
        // backgroundColor: 'blue',
        marginTop: 8,
        fontWeight: 'bold'
    },
    medium_favorite_touch: {
        width: 22,
        height: 21,
        position: 'absolute',
        right: 11,
        top: 11,
    },
    medium_favorite_icon: {
        width: 22,
        height: 21,
    },
    fat_favorite_touch_base: {
        width: 44,
        height: 44,
        position: 'absolute',
        right: 23,
        bottom: 108,
        backgroundColor: '#fff',
        marginLeft: 10,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fat_favorite_touch_ios: {
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: grayShadow,
    },
    fat_favorite_touch_android: {
        backgroundColor: '#fff',
        shadowColor: blackShadow,
        elevation: 3,
    },
    fat_favorite_icon: {
        width: 22,
        height: 21,
        marginTop: 2,
    },
    fat_address: {
        width: '100%',
        fontSize: 15,
        color: darkerGrayText,
        marginTop: 8,
        // backgroundColor: 'yellow',
    },
    fat_price: {
        width: '100%',
        fontSize: 16,
        color: darkPlainText,
        marginTop: 8,
        fontWeight: 'bold'
        // backgroundColor: 'yellow',
    },
});
export default Styles