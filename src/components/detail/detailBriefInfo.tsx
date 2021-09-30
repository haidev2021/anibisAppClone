import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, Dimensions, TouchableOpacity
} from 'react-native';
import { IXBaseAdvert, TLanguage, XBasePictureS, TTextPack } from '../../utils/xbaseInterface.d';
import { favoriteButtonOff, viewFullImageIcon, noPictureImage, favoriteButtonOn } from '../../utils/assetHelper';
import { Styles } from './styles';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import Carousel from 'react-native-snap-carousel';
import { SERVER } from '../../utils/network';
import FastImage from 'react-native-fast-image'
import { trans } from '../../utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalFavoriteAction, removeLocalFavoriteAction } from '../../redux/actions/actionsFavorite';
import { ScrollView } from 'react-native-gesture-handler';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export interface IDetailBriefInfoProps {
    advert: IXBaseAdvert;
    lng: TLanguage;
    texts: TTextPack;
}

export default function DetailBriefInfo(props: IDetailBriefInfoProps) {
    const { advert, lng, texts } = props;
    const [currentImg, setCurrentImg] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const [virtualIndex, setVirtualIndex] = useState(0);
    const dispatch = useDispatch();
    const favoriteIds = useSelector(state => state.favorite.ids)
    const onFavoritePress = useCallback(() => {
        dispatch(addLocalFavoriteAction(advert, (message: string) => { }))
    }, [advert])

    const onUnfavoritePress = useCallback(() => {
        dispatch(removeLocalFavoriteAction(advert._id, (message: string) => { }))
    }, [advert])

    const isFavorite = useMemo(() => {
        return favoriteIds.indexOf(advert._id) >= 0
    }, [favoriteIds, advert])

    function _renderItem({ item, index }: any) {
        return (
            <FastImage
                style={Styles.image}
                source={{
                    uri: SERVER + "/blogPhotosResized/" + item.blogPhotosResized,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        )
    }
    return <View style={Styles.brief_info_container}>
        {advert.pictures && advert.pictures.length > 0 &&
                <Carousel
                    useScrollView={true}
                    vertical={false}
                    // scrollEnabled={true}
                    layout={"default"}
                    // loop={true}
                    data={advert.pictures}
                    sliderWidth={viewportWidth}
                    itemWidth={viewportWidth}
                    // itemHeight={viewportWidth * 3 / 4}
                    slideStyle={{ width: viewportWidth }}
                    // sliderHeight={viewportWidth * 3 / 4}
                    renderItem={_renderItem}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    onSnapToItem={index => {
                        setActiveIndex(index)
                    }}
                />}
        {(!advert.pictures || advert.pictures.length == 0) && <View style={Styles.no_image_container}>
            <Image source={noPictureImage} style={Styles.noThumb}></Image>
        </View>}
        {advert.pictures && advert.pictures.length > 0 && <View style={Styles.img_index_container}>
            <Image source={viewFullImageIcon} style={Styles.view_full_image_icon}></Image>
            <Text style={Styles.img_index_text}>{(activeIndex + 1) + ' / ' + advert.pictures.length}</Text>
        </View>}
        <View style={Styles.text_button_container}>
            <View style={Styles.title_container}>
                <Text style={Styles.title}>{advert.title}</Text>
                {!isFavorite ?
                    <TouchableOpacity onPress={onFavoritePress}>
                        <Image source={favoriteButtonOff} style={Styles.favorite_button} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={onUnfavoritePress}>
                        <Image source={favoriteButtonOn} style={Styles.favorite_button} />
                    </TouchableOpacity>}
            </View>
            <View style={Styles.brief_address}>
                <Text style={Styles.brief_address_text}>{advert.contactAddress.street}</Text>
                <Text style={Styles.brief_address_text}>{advert.contactAddress.countryCode}-{advert.contactAddress.zip} {advert.contactAddress.city}</Text>
            </View>
            <Text style={Styles.price}>{advert.price}</Text>
            <FullWidthButton onPress={() => { }} text={trans("apps.action.contactseller", texts)} isPrimary={true} />
        </View>
    </View>
}