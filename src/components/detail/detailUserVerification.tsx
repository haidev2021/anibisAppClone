import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, Dimensions,
} from 'react-native';
import { IXBaseAdvert, TLanguage, XBasePictureS, TTextPack } from '../../utils/xbaseInterface.d';
import { favoriteButtonOff, viewFullImageIcon, viewSMSVerifiedIcon } from '../../utils/assetHelper';
import { Styles } from './styles';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import Carousel from 'react-native-snap-carousel';
import { SERVER } from '../../utils/network';
import FastImage from 'react-native-fast-image'
import UpperCasedLink from '../../sharedcomponents/button/upperCasedLink';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import MapView from 'react-native-maps';
import LowerCasedLink from '../../sharedcomponents/button/lowerCasedLink';

export interface IDetailContactProps {
    advert: IXBaseAdvert;
    lng: TLanguage;
    texts: TTextPack;
}

export default function DetailUserVerification(props: IDetailContactProps) {
    const { advert, lng, texts } = props;
    return <Image source={viewSMSVerifiedIcon} style={Styles.sms_vertification} />
}