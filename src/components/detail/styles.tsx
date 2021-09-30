
import React from 'react';
import {
    StyleSheet, Dimensions,
} from 'react-native';
import { accentColor, grayBg, darkGrayText } from '../../utils/xbaseInterface.d';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const Styles = StyleSheet.create({
    scroll_view: {
        width: viewportWidth, 
        height: viewportHeight
    },
    separator: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        margin: 20,
    },
    section_title: {
        fontSize: 19,
    },
    brief_info_container: {
        // marginLeft: 20,
        // marginRight: 20,
    },
    text_button_container: {
        margin: 20,
        marginBottom: 0,
        // backgroundColor: 'yellow',
    },
    image: {
        width: viewportWidth, 
        height: viewportWidth * 3 / 4, 
    },
    title_container: {
        flexDirection: 'row',
        // backgroundColor: 'yellow',
        marginBottom: 20,
    },
    title: {
        flex: 1,
        fontSize: 22,
        marginRight: 20,
    },
    favorite_button: {
        width: 28,
        height: 26,
    },
    brief_address: {
    },
    brief_address_text: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 8,
    },
    brief_contact_button: {
        width: '100%',
        margin: 20,
        height: 40,
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
        shadowColor: 'lightgray'
    },
    button_text: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
    },
    img_index_container: {
        width: 80,
        height: 30,
        position: 'absolute',
        flexDirection: 'row',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        top: (viewportWidth * 3 / 4) - 36, 
        left: viewportWidth/2 - 40,
    },
    view_full_image_icon: {
        width: 25,
        height: 25,
        marginLeft: 3,
    },
    img_index_text: {
        marginLeft: 6,
    },
    attribute_list_container: {
        // marginTop: 20,
    },
    attribute_item: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 6,
    },
    attribute_item_key: {
        flex: 1,
        fontSize: 15,
        marginRight: 20,
    },
    attribute_item_value: {
        flex: 1,
        fontSize: 15,
        marginRight: 20,
        // backgroundColor: 'yellow'
    },
    description_container: {
        marginLeft: 20,
        marginRight: 20,
    },
    // description: {
    //     marginTop: 8,
    //     fontSize: 15,
    // },
    starting_text: {
        marginTop: 8,
    },
    starting_plain_text: {
        marginTop: 8,
        fontSize: 15,
    },
    plain_text: {
        fontSize: 15,
    },
    detail_upper_case_link: {
        marginTop: 6,
    },
    map: {
        marginTop: 8,
        width: viewportWidth - 40,
        height: viewportWidth/2 - 20,
    },
    phone_sms_container: { 
        flexDirection: 'row'
    },
    phone_container: { 
        flex: 2.5, 
        marginRight: 20
    },
    sms_container: { 
        flex: 1
    },
    sms_vertification: {
        width: 110,
        height: 35,
        marginLeft: 20,
    },
    no_image_container: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: grayBg,
    },
    noThumb: {
        width: 64,
        height: 48,
    },
});