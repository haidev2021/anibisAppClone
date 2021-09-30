
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, TouchableOpacity, Dimensions, ActivityIndicator, Platform
} from 'react-native';

import { getStateText, getStateColor, STATE_ACTIVE, STATE_DEACTAVATED, STATE_TO_APPROVE } from '../../utils/advertState';
import { RecyclerListView, LayoutProvider, DataProvider } from "recyclerlistview";
import moment from 'moment';
import { ADVERT_SEARCH_RESULT_API, SERVER } from '../../utils/network';
import { IXBaseAdvert, ILoginInfo, NullableIRootContext, IRootContext, TTextPack, TLanguage, IAdvertId, INoContent, accentColor } from '../../utils/xbaseInterface.d';
import Styles, { THIN_ITEM_WIDTH, THIN_ITEMS_PER_SCREEN_WIDTH, FAT_ITEM_HEIGHT, THIN_ITEM_HEIGHT, FAT_ITEM_WIDTH, ITEM_HORIZONTAL_MARGIN, ITEM_VERTICAL_MARGIN, SHADOW_WIDTH, SHADOW_VISIBILITY_WIDTH, VERTICAL_LIST_HEIGHT, MEDIUM_ITEM_WIDTH, MEDIUM_ITEM_HEIGHT, ITEMS_PER_SCREEN_HEIGHT, MEDIUM_ITEMS_PER_SCREEN_HEIGHT, FAT_ITEMS_PER_SCREEN_HEIGHT, INSERTION_ITEM_HEIGHT, INSERTION_ITEMS_PER_SCREEN_HEIGHT, INSERTION_ITEM_WIDTH } from './styles'
import { trans, formatDate } from '../../utils/common';
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGalleryAdvertsAction } from '../../redux/actions/actionsGalleryList';
import { IOnError, IOnAdvertsSuccess, IFetchAdvertsByIdsParam } from '../../redux/actions/action.d';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { noPictureImage, noContentImage, favoriteButtonIcon, favoriteButtonOff, favoriteButtonOn } from '../../utils/assetHelper';
import FastImage from 'react-native-fast-image';
import { FilterListStyles } from '../filterableList/filterListStyles';
import { fLog } from '../../utils/utils';
import { addLocalFavoriteAction, removeLocalFavoriteAction } from '../../redux/actions/actionsFavorite';
import { listTypeToNameMap, listTypeToFetchActionMap } from '../../screen/detailPager/detailPagerFragment';
import { resetInsertionListAction } from '../../redux/actions/actionsInsertionList';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const TAG = "List"
const BUG_FIXING_MIN_DIMENSION = 1;
export const ListType = {
    GALLERY: 0,
    SEARCH: 1,
    USER_LISTING: 2,
    INSERTION: 3,
    FAVORITE: 4,
    HISTORY: 5,
    SINGLE_ITEM: 6,
};
Object.freeze(ListType);
export const ItemType = {
    THIN: 0,
    FAT: 1,
    MEDIUM: 2,
    INSERTION: 3,
};
Object.freeze(ItemType);
export interface IAdvertList {
    itemType: number;
    listType: number,
    lng: TLanguage;
    itemClass: string;
    navigation: any;
    nocontent?: INoContent;
}

export function AdvertList(props: IAdvertList): JSX.Element {
    let { itemType,
        listType,
        lng,
        itemClass,
        navigation,
        nocontent, } = props;
    const dispatch = useDispatch();

    const listName = listTypeToNameMap.get(listType)
    const isLoading = useSelector((state) => state[listName].isLoading)
    const fetchAdvertsByIdsAction = listTypeToFetchActionMap.get(listType)
    const adverts = useSelector((state) => state[listName].adverts)
    const nextIdsToFetch = useSelector(state => state[listName].nextIdsToFetch) as IAdvertId[]

    const [dataProvider, setDataProvider] = useState(new DataProvider((r1, r2) => {
        return r1 !== r2
    }).cloneWithRows([]));

    const onScroll = useCallback((rawEvent: ScrollEvent, offsetX: number, offsetY: number) => {
        let currentItemIndex, invisibleCountThreshold;
        switch (itemType) {
            case ItemType.THIN:
                currentItemIndex = offsetX / THIN_ITEM_WIDTH
                invisibleCountThreshold = THIN_ITEMS_PER_SCREEN_WIDTH;
                break;
            case ItemType.FAT:
                currentItemIndex = offsetY / FAT_ITEM_HEIGHT
                invisibleCountThreshold = FAT_ITEMS_PER_SCREEN_HEIGHT;
                break;
            case ItemType.MEDIUM:
                currentItemIndex = offsetY / MEDIUM_ITEM_HEIGHT
                invisibleCountThreshold = MEDIUM_ITEMS_PER_SCREEN_HEIGHT;
                break;
            case ItemType.INSERTION:
                currentItemIndex = offsetY / INSERTION_ITEM_HEIGHT
                invisibleCountThreshold = INSERTION_ITEMS_PER_SCREEN_HEIGHT;
                break;
        }
        let isFetchPosReached = nextIdsToFetch.length > 0 && currentItemIndex > adverts.length - invisibleCountThreshold
        if (isFetchPosReached) {
            let onError: IOnError = function (error: string) {
                fLog(TAG, "POST '/lastestOffers' ERROR:", error);
            }
            let param: IFetchAdvertsByIdsParam = {
                ids: nextIdsToFetch,
                language: lng,
                debug: 'non-search'
            };
            dispatch(fetchAdvertsByIdsAction(param, onError));
        }
    }, [nextIdsToFetch, adverts, itemType]);

    useEffect(() => {
        if (nextIdsToFetch.length > 0 && adverts.length == 0) {
            fLog(TAG, " onScroll(null, 0, 0)",);
            onScroll(null, 0, 0);
        }
    }, [nextIdsToFetch, adverts, onScroll])

    useEffect(() => {
        // fLog("favorite", `adverts.length = `, adverts.length);
        // if (adverts.length > 0) {
        setDataProvider(new DataProvider((r1, r2) => {
            return r1 !== r2
        }).cloneWithRows(adverts))
        // }
    }, [adverts])
    fLog(TAG, `nextIdsToFetch`, nextIdsToFetch)
    const renderRow = useCallback((type, data, index) => {
        switch (itemType) {
            case ItemType.THIN:
                return <ThinAdvertItem listType={listType} advert={data} navigation={navigation} index={index} />
            case ItemType.FAT:
                return <FatAdvertItem listType={listType} advert={data} navigation={navigation} index={index} />
            case ItemType.MEDIUM:
                return <MediumAdvertItem listType={listType} advert={data} navigation={navigation} index={index} />
            case ItemType.INSERTION:
                return <InsertionAdvertItem listType={listType} advert={data} navigation={navigation} index={index} />
        }
    }, [itemType]);

    // fLog(TAG, 'adverts.length', adverts.length)
    const layoutProvider = useMemo(() =>
        new LayoutProvider(
            (i) => {
                return "ITEM";
            }, (type, dim) => {
                switch (type) {
                    case "ITEM":
                    default:
                        switch (itemType) {
                            case ItemType.THIN:
                                dim.width = THIN_ITEM_WIDTH + ITEM_HORIZONTAL_MARGIN
                                dim.height = THIN_ITEM_HEIGHT
                                break;
                            case ItemType.FAT:
                                dim.width = FAT_ITEM_WIDTH
                                dim.height = FAT_ITEM_HEIGHT + ITEM_VERTICAL_MARGIN;
                                break;
                            case ItemType.MEDIUM:
                                dim.width = MEDIUM_ITEM_WIDTH
                                dim.height = MEDIUM_ITEM_HEIGHT + ITEM_VERTICAL_MARGIN;
                                break;
                            case ItemType.INSERTION:
                                dim.width = INSERTION_ITEM_WIDTH
                                dim.height = INSERTION_ITEM_HEIGHT + ITEM_VERTICAL_MARGIN;
                                break;
                        }
                }
            }), [itemType]);

    const loadingStyle = StyleSheet.compose(FilterListStyles.loading, {
        display: !isLoading ? 'none' : 'flex',
    })

    const listContainerStyle = StyleSheet.compose({
        display: isLoading || adverts.length == 0 ? 'none' : 'flex',
        flex: 1,
        minWidth: BUG_FIXING_MIN_DIMENSION,
        minHeight: BUG_FIXING_MIN_DIMENSION,
    },
        itemType == ItemType.THIN ? {
            height: THIN_ITEM_HEIGHT + SHADOW_VISIBILITY_WIDTH
        } : {
                marginTop: 5
            })

    return <Fragment>

        <ActivityIndicator
            style={loadingStyle}
            size="large"
            color={Platform.OS === 'ios' ? 'gray' : accentColor} />
        <View style={listContainerStyle}>
            {adverts && adverts.length > 0 && <RecyclerListView style={{ flex: 1 }}
                rowRenderer={renderRow}
                dataProvider={dataProvider}
                layoutProvider={layoutProvider}
                isHorizontal={itemType == ItemType.THIN}
                onScroll={onScroll}
                paddingTop={itemType == ItemType.THIN ? 0 : 6}
                paddingRight={itemType == ItemType.THIN ? 20 : 0} />}
        </View>

        {itemType != ItemType.THIN && nocontent && <View style={{ display: !isLoading && adverts.length == 0 ? 'flex' : 'none' }}>
            <View style={FilterListStyles.no_content}>
                <Image source={noContentImage}></Image>
                <View>
                    <Text style={FilterListStyles.no_content_description}>{nocontent.description}</Text>
                    <TouchableOpacity style={FilterListStyles.no_content_button} onPress={nocontent.onButtonClick}>
                        <Text style={FilterListStyles.button_text}>{nocontent.buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>}
    </Fragment>
}

interface AdvertItemPropsS {
    listType: number;
    advert: IXBaseAdvert | null;
    navigation: any;
    index?: number;
}
export interface AdvertItemObjectS {
    advert: IXBaseAdvert;
    className: string;
}

export function ThinAdvertItem(props: AdvertItemPropsS): JSX.Element | null {
    const { advert, navigation, index, listType } = props;

    const onAdvertClick = useCallback(() => {
        navigation.navigate(listType == ListType.USER_LISTING ? 'NestedDetailPager' : 'DetailPager', { firstItem: index, listType });
    }, [advert]);

    if (!advert) {
        return <Text>null</Text>;
    } else {
        let item_bg_and_shadow_style = Platform.OS === 'ios' ? Styles.item_bg_and_shadow_ios : Styles.item_bg_and_shadow_android
        return <TouchableOpacity onPress={onAdvertClick}
            style={StyleSheet.compose(Styles.item, item_bg_and_shadow_style)}>
            {advert.thumbnail && <FastImage
                style={Styles.thumb}
                source={{
                    uri: SERVER + "/blogPhotosThumbnail/" + advert.thumbnail,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />}
            {!advert.thumbnail && <View style={Styles.thumb}>
                <Image source={noPictureImage} style={Styles.noThumb}></Image>
            </View>}
            <View style={Styles.texts}>
                <Text numberOfLines={1} style={Styles.title}>{advert.title}</Text>
                <Text numberOfLines={1} style={Styles.price}>{advert.contactAddress ? advert.contactAddress.zip : ""} {advert.contactAddress ? advert.contactAddress.city : ""}</Text>
                <Text numberOfLines={1} style={Styles.price}>{advert.price}</Text>
            </View>
        </TouchableOpacity>
    }
}
function useFavorite(advert: IXBaseAdvert) {
    const dispatch = useDispatch();
    const favoriteIds = useSelector(state => state.favorite.ids)
    const isFavorite = useMemo(() => {
        return advert && favoriteIds.indexOf(advert._id) >= 0
    }, [favoriteIds, advert])

    const onFavoritePress = useCallback(() => {
        dispatch(addLocalFavoriteAction(advert, (message: string) => { }))
    }, [advert])

    const onUnfavoritePress = useCallback(() => {
        dispatch(removeLocalFavoriteAction(advert._id, (message: string) => { }))
    }, [advert])
    return [isFavorite, onFavoritePress, onUnfavoritePress]
}

export function MediumAdvertItem(props: AdvertItemPropsS): JSX.Element | null {
    const { advert, navigation, index, listType } = props;

    const [isFavorite, onFavoritePress, onUnfavoritePress] = useFavorite(advert);

    const onAdvertClick = useCallback(() => {
        navigation.navigate(listType == ListType.USER_LISTING ? 'NestedDetailPager' : 'DetailPager', { firstItem: index, listType });
    }, [advert]);

    if (!advert) {
        return null;
    } else {
        let item_bg_and_shadow_style = Platform.OS === 'ios' ? Styles.item_bg_and_shadow_ios : Styles.item_bg_and_shadow_android
        return <TouchableOpacity onPress={onAdvertClick} style={StyleSheet.compose(item_bg_and_shadow_style, Styles.medium_item)}>
            {advert.thumbnail && <FastImage
                style={Styles.meidum_thumb}
                source={{
                    uri: SERVER + "/blogPhotosThumbnail/" + advert.thumbnail,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />}
            {!advert.thumbnail && <View style={Styles.meidum_thumb}>
                <Image source={noPictureImage} style={Styles.noThumb}></Image>
            </View>}
            <View style={Styles.medium_texts}>
                <Text numberOfLines={1} style={Styles.medium_title}>{advert.title}</Text>
                <Text numberOfLines={1} style={Styles.medium_address}>{advert.contactAddress.zip} {advert.contactAddress.city}</Text>
                <Text numberOfLines={1} style={Styles.medium_price}>{advert.price}</Text>
            </View>
            {!isFavorite ?
                <TouchableOpacity style={Styles.medium_favorite_touch} onPress={onFavoritePress}>
                    <Image source={favoriteButtonOff} style={Styles.medium_favorite_icon} />
                </TouchableOpacity> :
                <TouchableOpacity style={Styles.medium_favorite_touch} onPress={onUnfavoritePress}>
                    <Image source={favoriteButtonOn} style={Styles.medium_favorite_icon} />
                </TouchableOpacity>}
        </TouchableOpacity>
    }
}

export function FatAdvertItem(props: AdvertItemPropsS): JSX.Element | null {
    const { advert, navigation, index, listType } = props;
    const [isFavorite, onFavoritePress, onUnfavoritePress] = useFavorite(advert);
    const onAdvertClick = useCallback(() => {
        navigation.navigate(listType == ListType.USER_LISTING ? 'NestedDetailPager' : 'DetailPager', { firstItem: index, listType });
    }, [advert]);

    if (!advert) {
        return null;
    } else {
        let item_bg_and_shadow_style = Platform.OS === 'ios' ? Styles.item_bg_and_shadow_ios : Styles.item_bg_and_shadow_android
        let fat_favorite_touch_style = StyleSheet.compose(Styles.fat_favorite_touch_base, Platform.OS === 'ios' ? Styles.fat_favorite_touch_ios : Styles.fat_favorite_touch_android)
        return <TouchableOpacity onPress={onAdvertClick}
            style={StyleSheet.compose(item_bg_and_shadow_style, Styles.fat_item)}>
            <View style={Styles.fat_info}>
                {advert.thumbnail && <FastImage
                    style={Styles.fat_thumb}
                    source={{
                        uri: SERVER + "/blogPhotosThumbnail/" + advert.thumbnail,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />}
                {!advert.thumbnail && <View style={Styles.fat_thumb}>
                    <Image source={noPictureImage} style={Styles.fat_noThumb}></Image>
                </View>}
                <View style={Styles.fat_texts}>
                    <Text numberOfLines={1} style={Styles.fat_title}>{advert.title}</Text>
                    <Text numberOfLines={1} style={Styles.fat_address}>{advert.contactAddress.zip} {advert.contactAddress.city}</Text>
                    <Text numberOfLines={1} style={Styles.fat_price}>{advert.price}</Text>
                </View>

                {!isFavorite ?
                    <TouchableOpacity style={fat_favorite_touch_style} onPress={onFavoritePress}>
                        <Image source={favoriteButtonOff} style={Styles.fat_favorite_icon} />
                    </TouchableOpacity> :
                    <TouchableOpacity style={fat_favorite_touch_style} onPress={onUnfavoritePress}>
                        <Image source={favoriteButtonOn} style={Styles.fat_favorite_icon} />
                    </TouchableOpacity>}
            </View>
        </TouchableOpacity>
    }
}

export function InsertionAdvertItem(props: AdvertItemPropsS): JSX.Element | null {
    const { advert, navigation, index, listType } = props;
    const texts = useSelector(state => state.localization.texts)
    const dispatch = useDispatch();
    const onAdvertClick = useCallback(() => {
        navigation.navigate(listType == ListType.USER_LISTING ? 'NestedDetailPager' : 'DetailPager', { firstItem: index, listType });
        // dispatch(resetInsertionListAction())
    }, [advert]);

    if (!advert) {
        return null;
    } else {
        return <TouchableOpacity onPress={onAdvertClick} style={Styles.insertion_item}>
            {advert.thumbnail && <FastImage
                style={Styles.insertion_thumb}
                source={{
                    uri: SERVER + "/blogPhotosThumbnail/" + advert.thumbnail,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />}
            {!advert.thumbnail && <View style={Styles.insertion_thumb}>
                <Image source={noPictureImage} style={Styles.noThumb}></Image>
            </View>}
            <View style={Styles.insertion_texts}>
                <Text numberOfLines={1} style={Styles.insertion_title}>{advert.title}</Text>
                <Text numberOfLines={1} style={Styles.insertion_price}>{advert.price}</Text>
                <Text numberOfLines={1} style={Styles.insertion_statistic}>{advert.hits} {trans('apps.statsviews', texts)}, {advert.contacts} {trans('apps.statsrequests', texts)}</Text>
            </View>
            <View style={Styles.insertion_date_state}>
                <Text style={Styles.insertion_date}>{trans('apps.datecreate', texts)} {formatDate(advert.posted)}</Text>
                <View style={StyleSheet.compose(Styles.insertion_state_border, { backgroundColor: getStateColor(advert.state) })}>
                    <Text style={Styles.insertion_state}>{trans(getStateText(advert.state), texts)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
}