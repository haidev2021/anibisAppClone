import * as React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';
import Detail from '../../components/detail/detail';
import { MOCK_DETAIL } from '../../components/detail/mockData';
import { IXBaseAdvert, IAdvertId, graySeparator } from '../../utils/xbaseInterface.d';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../../Type';
import { useSelector, useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { useMemo, useEffect, useCallback } from 'react';
import { IOnError, IFetchAdvertsByIdsParam } from '../../redux/actions/action.d';
import { fetchGalleryAdvertsAction } from '../../redux/actions/actionsGalleryList';
import { fetchSearchListAdvertsAction } from '../../redux/actions/actionsSearchList';
import { ListType } from '../../components/advertLists/list';
import { fetchFavoriteAdvertsAction } from '../../redux/actions/actionsFavorite';
import Title from '../../sharedcomponents/title/title';
import { trans } from '../../utils/common';
import PlainText from '../../sharedcomponents/plainText/plainText';
import UpperCasedLink from '../../sharedcomponents/button/upperCasedLink';
import { addHistoryListItemAction, fetchHistoryListAdvertsAction } from '../../redux/actions/actionHistoryList';
import { fetchUserListingListAdvertsAction } from '../../redux/actions/actionsUserListingList';
import { fetchInsertionListAdvertsAction } from '../../redux/actions/actionsInsertionList';
import InsertionDetail from '../../components/insertionDetail/insertionDetail';
import { fLog } from '../../utils/utils';
const USESCROLLVIEW_TO_FIX_NESTED_CAROUSEL_CRASH = true;
const ITEMS_BEFORE_LOAD_MORE = 3;
export const listTypeToNameMap = new Map([
    [ListType.GALLERY, "galleryList"],
    [ListType.SEARCH, "searchList"],
    [ListType.FAVORITE, "favorite"],
    [ListType.HISTORY, "historyList"],
    [ListType.USER_LISTING, "userListingList"],
    [ListType.INSERTION, "insertionList"],
]);
export const listTypeToFetchActionMap = new Map([
    [ListType.GALLERY, fetchGalleryAdvertsAction],
    [ListType.SEARCH, fetchSearchListAdvertsAction],
    [ListType.FAVORITE, fetchFavoriteAdvertsAction],
    [ListType.HISTORY, fetchHistoryListAdvertsAction],
    [ListType.USER_LISTING, fetchUserListingListAdvertsAction],
    [ListType.INSERTION, fetchInsertionListAdvertsAction],
]);
export interface IDetailPagerFragmentProps {
    navigation: any;
    firstItem: number;
    listType: number;
}
export default function DetailPagerFragment(props: IDetailPagerFragmentProps) {
    const { firstItem, listType, navigation } = props;
    const [activeIndex, setActiveIndex] = React.useState(0);
    const dispatch = useDispatch();
    const texts = useSelector(state => state.localization.texts);
    const listName = listTypeToNameMap.get(listType)
    const fetchAction = listTypeToFetchActionMap.get(listType)
    const adverts = useSelector((state) => state[listName].adverts)
    const nextIdsToFetch = useSelector(state => state[listName].nextIdsToFetch) as IAdvertId[]
    const TAG = "insert"
    const _renderItem = React.useCallback(function ({ item, index }: any) {
        // fLog(TAG, '_renderItem  index = ', index);
        return (
            // (index >= activeIndex + 5 || index <= activeIndex - 5) ? null :
            listType != ListType.INSERTION ? 
            <Detail detail={item as IXBaseAdvert} lng={"de"} navigation={navigation}></Detail> : 
            <InsertionDetail insertion={item as IXBaseAdvert} navigation={navigation}></InsertionDetail>
        )
    }, [activeIndex, adverts, listType, navigation]);

    useEffect(() => {
        setActiveIndex(firstItem);
        if (listType != ListType.HISTORY)
            dispatch(addHistoryListItemAction(adverts[firstItem]))
    }, [firstItem, listType, adverts])

    const onBeforeSnapToItem = useCallback((index) => {
        setActiveIndex(index)
        if (index >= adverts.length - ITEMS_BEFORE_LOAD_MORE && nextIdsToFetch.length > 0) {
            let onError: IOnError = function (error: string) {
                console.log("POST '/fetchGalleryAdvertsAction' ERROR:", error);
            }
            let param: IFetchAdvertsByIdsParam = {
                ids: nextIdsToFetch,
                language: 'de',
                debug: 'non-search'
            };
            dispatch(fetchAction(param, onError))
        }
    }, [nextIdsToFetch, adverts]);

    const onSearchPress = useCallback(() => {
        navigation.navigate(trans("apps.search", texts))
    }, [navigation, texts])

    const onSnapToItem = useCallback((index) => {
        if (listType != ListType.HISTORY)
            dispatch(addHistoryListItemAction(adverts[index]))
        setActiveIndex(index)
        if (index >= adverts.length - ITEMS_BEFORE_LOAD_MORE && nextIdsToFetch.length > 0) {
            let onError: IOnError = function (error: string) {
                console.log("POST '/fetchGalleryAdvertsAction' ERROR:", error);
            }
            let param: IFetchAdvertsByIdsParam = {
                ids: nextIdsToFetch,
                language: 'de',
                debug: 'non-search'
            };
            dispatch(fetchAction(param, onError))
        }
    }, [nextIdsToFetch, adverts, listType])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                {adverts.length > 0 ?
                    <Carousel
                        //   ref={ref => this.carousel = ref}
                        // nestedScrollEnabled={true}
                        // useScrollView={USESCROLLVIEW_TO_FIX_NESTED_CAROUSEL_CRASH}
                        layout={"default"}
                        loop={false}
                        firstItem={firstItem}
                        data={adverts}
                        sliderWidth={viewportWidth}
                        itemWidth={viewportWidth}
                        // itemHeight={windowHeight}
                        slideStyle={{ width: viewportWidth }}
                        // sliderHeight={windowHeight}
                        renderItem={_renderItem}
                        inactiveSlideScale={0.9}
                        inactiveSlideOpacity={0.8}
                        // onBeforeSnapToItem={onBeforeSnapToItem}
                        onSnapToItem={onSnapToItem}
                        enableSnap={true} 
                        vertical={false}/> :
                    <View style={styles.container}>
                        <Title style={styles.title} text={trans("apps.notification.inactive", texts)}></Title>
                        <PlainText style={styles.message} text={trans("apps.notification.inactive.message", texts)}></PlainText>
                        <View style={styles.separator} ></View>
                        <UpperCasedLink style={styles.link} text={trans("apps.action.search", texts)} onPress={onSearchPress}></UpperCasedLink>
                    </View>
                }
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        marginTop: 40,
    },
    message: {
        marginTop: 10,
    },
    link: {
        marginTop: 16,
    },
    separator: {
        marginTop: 25,
        width: '100%',
        height: 1,
        backgroundColor: graySeparator,
    },
    label: {
        width: 20,
        height: 20,
    },
    edit: {
        width: 20,
        height: 20,
    },
});