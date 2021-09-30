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
import { favoriteButtonOff, viewFullImageIcon } from '../../utils/assetHelper';
import { Styles } from './styles';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import Carousel from 'react-native-snap-carousel';
import { SERVER } from '../../utils/network';
import FastImage from 'react-native-fast-image'
import UpperCasedLink from '../../sharedcomponents/button/upperCasedLink';
import { trans } from '../../utils/common';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export interface IDetailDescriptionProps {
    advert: IXBaseAdvert;
    lng: TLanguage;
    texts: TTextPack;
}

export default function DetailDescription(props: IDetailDescriptionProps) {
    const { advert, lng, texts } = props;
    const [showMore, setShowMore] = useState(false);
    const onShowMorePress = useCallback(() => {
        setShowMore(true)
    }, [])
    const onShowLessPress = useCallback(() => {
        setShowMore(false)
    }, [])
    return <View style={Styles.description_container}>
        <Text style={Styles.section_title}>{trans("apps.description", texts)}</Text>
        {!showMore && <Text style={Styles.starting_plain_text}>{advert.briefDescription}</Text>}
        {showMore && <Text style={Styles.starting_plain_text}>{advert.description}</Text>}
        {advert.briefDescription != advert.description && !showMore &&
            <UpperCasedLink style={Styles.detail_upper_case_link} text={trans("apps.action.moredescription", texts)} onPress={onShowMorePress}></UpperCasedLink>}
            {advert.briefDescription != advert.description && showMore &&
                <UpperCasedLink text={trans("apps.action.lessdescription", texts)} onPress={onShowLessPress}></UpperCasedLink>}
    </View>
}