import React, { useState, useEffect, useCallback, Fragment } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Image, Button,
} from 'react-native';
import { RootStackParamList } from '../../../Type';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Filter } from '../../components/filter/filter';
import { useSelector, useDispatch } from 'react-redux';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import { trans } from '../../utils/common';
import { img_add_image } from '../../utils/assetHelper';
import { LoginFragment } from '../../components/login/loginFragment';
import { AdvertList, ListType, ItemType } from '../../components/advertLists/list';
import { fetchHistoryListIdsAction } from '../../redux/actions/actionHistoryList';
import { fetchInsertionListIdsAction } from '../../redux/actions/actionsInsertionList';

export default function InsertionList({ navigation }: BottomTabScreenProps<RootStackParamList, 'InsertionList'>) {
  const texts = useSelector(state => state.localization.texts);
  const token = useSelector(state => state.authentication.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInsertionListIdsAction((message: string) => { }))
  }, [])

  const onCreatePress = useCallback(() => {
    navigation.navigate(trans("apps.insertion", texts))
}, [navigation])

  return (
    !token ?
      <LoginFragment showLoginTitle={true} /> :
      <AdvertList
        itemType={ItemType.INSERTION}
        listType={ListType.INSERTION}
        itemClass="non-material-bordered"
        lng={"de"}
        navigation={navigation}
        nocontent={{
          title: trans("apps.nolistings", texts),
          description: trans("apps.nolistings.description", texts),
          buttonText: trans("apps.action.createlisting", texts),
          onButtonClick: onCreatePress
        }} />
  )
}