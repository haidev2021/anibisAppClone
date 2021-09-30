

import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Image, Button, ActivityIndicator, Modal, Dimensions, TouchableOpacity, Platform, TextInput,
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import { RootStackParamList } from '../../../Type';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ShortcutCategory from '../../components/home/shortcutCategory';
import { ADVERT_GALLERY_API, ADVERT_LASTEST_OFFERS_API, ADVERT_SEARCH_RESULT_API } from '../../utils/network';
import { AdvertList, ListType, ItemType } from '../../components/advertLists/list';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGallery } from '../../redux/services/services';
import { fetchGalleryIdsAction, fetchGalleryAdvertsAction } from '../../redux/actions/actionsGalleryList';
import { IOnAdvertIdsSuccess, IOnError } from '../../redux/actions/action.d';
import { IAdvertId, IXBaseCategory, accentColor, grayShadow, darkGrayText } from '../../utils/xbaseInterface.d';
import { CategoryModalWrapper } from '../../components/home/categoryModalWrapper';
import { resetSearchListAction } from '../../redux/actions/actionsSearchList';
import { fLog } from '../../utils/utils';
import { tabs_ic_search, ic_menu_allcat, ic_menu_home_rent, ic_menu_home_buy, ic_menu_car, ic_menu_job, logo_anibis } from '../../utils/assetHelper';
import { trans } from '../../utils/common';
import { fetchFavoriteAdvertsAction } from '../../redux/actions/actionsFavorite';
import { fetchHistoryListAdvertsAction } from '../../redux/actions/actionHistoryList';
import UpperCasedLink from '../../sharedcomponents/button/upperCasedLink';
import { HStyles } from './hStyles';
type Props = BottomTabScreenProps<RootStackParamList, 'Home'>;

const SHORTCUT_CATS = [
  { id: 0, icon: ic_menu_allcat, text: "apps.home.new.inallcategories" },
  { id: 410, icon: ic_menu_home_rent, text: "apps.home.new.realestate.rent" },
  { id: 438, icon: ic_menu_home_buy, text: "apps.home.new.realestate.buy" },
  { id: 113, icon: ic_menu_car, text: "apps.home.new.cars" },
  { id: 305, icon: ic_menu_job, text: "apps.home.new.jobs" }]

export default function Home({ navigation }: Props) {
  // const [galleryAdvertIds, setGalleryAdvertIds] = useState<IAdvertId[]>([]);
  const galleryAdvertIds = useSelector(state => state.galleryList.ids)
  const texts = useSelector(state => state.localization.texts)
  const language = useSelector(state => state.localization.language)
  const favoriteIds = useSelector(state => state.favorite.ids)
  const [latestOffers, setLatestOffers] = useState([]);
  const [lng, setLng] = useState("de");
  const [galleryLoadingUI, setGalleryLoadingUI] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<IXBaseCategory[]>([]);
  const dispatch = useDispatch();
  const TAG = "Home"
  fLog(TAG, `language = `, language, ' texts = ', texts);
  useEffect(() => {
    fLog(TAG, "POST '/fetchGalleryIdsAction' RESPONSE = ", galleryAdvertIds);
    // let onSuccess: IOnAdvertIdsSuccess = function (data: IAdvertId[]) {
    //   setGalleryAdvertIds(data);
    // }
    let onError: IOnError = function (error: string) {
      fLog(TAG, "POST '/lastestOffers' ERROR:", error);
    }
    dispatch(fetchGalleryIdsAction(onError))

  }, [lng]);

  const onAllCatPress = useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible])

  const HOME_RENT_SHORCUT_ID = 410;
  const HOME_BUY_SHORCUT_ID = 438;
  const CAR_SHORCUT_ID = 113;
  const JOB_SHORCUT_ID = 305;
  const CATEGORY_ID_ARRAY = [0, HOME_RENT_SHORCUT_ID, HOME_BUY_SHORCUT_ID, CAR_SHORCUT_ID, JOB_SHORCUT_ID];
  const onShortcutCatPress = useCallback((id, isCatId) => {
    dispatch(resetSearchListAction())
    navigation.navigate('Search', {
      catId: isCatId ? id : CATEGORY_ID_ARRAY[id],
      searchTermFlag: false,
      searchQuery: '',
    });
  }, [])

  const onCatClosePress = useCallback(() => {
    fLog(TAG, "onShortcutCatClosePress")
    setModalVisible(!true);
  }, [])

  const onSearchBarPress = useCallback(() => {
    dispatch(resetSearchListAction())
    navigation.navigate('Search', {
      catId: 0,
      searchTermFlag: true,
      searchQuery: '',
    });
  }, [navigation])

  const onMoreHistoryPress = useCallback(() => {
    navigation.navigate('History');
  }, [navigation])

  const onAllFavoritesPress = useCallback(() => {
    navigation.navigate('Favorite');
  }, [navigation])

  const search_input_container_style = Platform.OS === 'ios' ? HStyles.search_input_container_ios : HStyles.search_input_container_android
  return (
    <SafeAreaView style={HStyles.safeView}>
      <ScrollView style={HStyles.scroll}>
        <View style={HStyles.container}>

          <Image style={HStyles.logoText} source={logo_anibis} />
          {/* <TextInput style={HStyles.termEdit} ></TextInput> */}
          <TouchableOpacity style={search_input_container_style} onPress={onSearchBarPress}>
            {Platform.OS === 'ios' ? <SearchBar
              style={HStyles.search_bar_ios}
              editable={false}
              placeholder={trans("apps.searchkeyword", texts)} /> :
              <View style={HStyles.search_bar_android}>
                <Image style={HStyles.search_icon} source={tabs_ic_search}></Image>
                <Text style={HStyles.search_place_holder}>{trans("apps.searchkeyword", texts)}</Text>
              </View>}

          </TouchableOpacity>
          <ScrollView style={HStyles.categoriesScroll} horizontal={true}>
            <View style={HStyles.shortcutCategories}>
              {SHORTCUT_CATS.map((item, index) => {
                return <ShortcutCategory icon={item.icon} name={item.text} key={item.text}
                  onPress={index == 0 ? onAllCatPress : () => onShortcutCatPress(index, false)} />
              })}
            </View>
          </ScrollView>
          <View style={HStyles.galleryContainer}>
            <Text style={HStyles.title}>{trans('apps.home.gallery.label', texts)}</Text>
            {/* {galleryLoadingUI && <ActivityIndicator style={HStyles.loading} size="large" />} */}
            <AdvertList
              itemType={ItemType.THIN}
              listType={ListType.GALLERY}
              itemClass="non-material-bordered"
              lng={"de"}
              navigation={navigation} />
          </View>
          <View style={HStyles.favoriteContainer}>
            <View style={HStyles.list_title_container}>
              <Text style={HStyles.title}>{trans('apps.home.favorites.label', texts)}</Text>
              <UpperCasedLink style={HStyles.title_link} text={trans('apps.home.more.favorites', texts)} onPress={onAllFavoritesPress}></UpperCasedLink>
            </View>
            {/* <Text style={HStyles.title}>Favorites=(ids: {JSON.stringify(favoriteIds)})</Text> */}
            <AdvertList
              itemType={ItemType.THIN}
              listType={ListType.FAVORITE}
              itemClass="non-material-bordered"
              lng={"de"}
              navigation={navigation} />
          </View>
          <View style={HStyles.lastSearchContainer}>
            <View style={HStyles.list_title_container}>
              <Text style={HStyles.title}>{trans('apps.home.lastviewed.label', texts)}</Text>
              <UpperCasedLink style={HStyles.title_link} text={trans('apps.home.more.lastviewed', texts)} onPress={onMoreHistoryPress}></UpperCasedLink>
            </View>
            <AdvertList
              itemType={ItemType.THIN}
              listType={ListType.HISTORY}
              itemClass="non-material-bordered"
              lng={"de"}
              navigation={navigation} />
          </View>
          <CategoryModalWrapper visible={modalVisible} onXClick={onCatClosePress} navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}