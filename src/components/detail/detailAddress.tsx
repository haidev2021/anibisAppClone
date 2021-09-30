import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, Dimensions, TouchableOpacity
} from 'react-native';
import { IXBaseAdvert, TLanguage, XBasePictureS, TTextPack } from '../../utils/xbaseInterface.d';
import { favoriteButtonOff, viewFullImageIcon } from '../../utils/assetHelper';
import { Styles } from './styles';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import Carousel from 'react-native-snap-carousel';
import { SERVER } from '../../utils/network';
import FastImage from 'react-native-fast-image'
import UpperCasedLink from '../../sharedcomponents/button/upperCasedLink';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import MapView from 'react-native-maps';
import { trans } from '../../utils/common';

export interface IDetailAddressProps {
    advert: IXBaseAdvert;
    lng: TLanguage;
    texts: TTextPack;
}

export default function DetailAddress(props: IDetailAddressProps) {
    const { advert, lng, texts } = props;
    const onMapPress = useCallback(() => {
    }, [])
    return <View style={Styles.description_container}>
        <Text style={Styles.section_title}>{trans("apps.detail.maps.title", texts)}</Text>
        {/* <MapView style={Styles.map}
            initialRegion={{
                latitude: 46.956055,
                longitude: 7.451726,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        /> */}
        <Text style={Styles.starting_plain_text}>{advert.contactAddress.street}</Text>
        <Text style={Styles.plain_text}>{advert.contactAddress.countryCode}-{advert.contactAddress.zip} {advert.contactAddress.city}</Text>
        <UpperCasedLink style={Styles.detail_upper_case_link} text={trans("apps.detail.maps.openmaps", texts)} onPress={onMapPress}></UpperCasedLink> 
    </View>
}