import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Image, Button, TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../../../Type';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { LanguageSelector } from '../../components/languageSelector/langugeSelector';
import { trans } from '../../utils/common';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import MyAnibisItem from '../../components/myAnibisItem/MyAnibisItem';
import { ic_menu_about, ic_menu_favorite, ic_menu_my_listing, ic_menu_feedback, ic_menu_setting, ic_menu_login } from '../../utils/assetHelper';
import { resetInsertionListAction } from '../../redux/actions/actionsInsertionList';
import { IOnSuccessNoContent } from '../../redux/actions/action.d';
import { setLanguageAction } from '../../redux/actions/actionsLocalization';
import { MAStyles } from './maStyles';

type Props = BottomTabScreenProps<RootStackParamList, 'MyAnibis'>;
export default function MyAnibis({ navigation }: Props) {
  const [sortModalOpen, setSettingModalOpen] = useState(false);
  const language = useSelector(state => state.localization.language);
  const texts = useSelector(state => state.localization.texts);
  const favoriteIds = useSelector(state => state.favorite.ids);
  const insertionIds = useSelector(state => state.insertionList.ids);
  const dispatch = useDispatch();

  const onSettingPress = useCallback(() => {
      setSettingModalOpen(true);
    },
    [setSettingModalOpen],
  )
  
  const onSettingClosePress = useCallback(() => {
      setSettingModalOpen(false);
    },
    [setSettingModalOpen],
  )

  const onLoginAccountPress = useCallback(
    () => {
      navigation.navigate('Login');
    },
    [navigation],
  )
  const onAboutPress = useCallback(
    () => {
      navigation.navigate('About');
    },
    [navigation],
  )
  const onFeedbackPress = useCallback(
    () => {
      navigation.navigate('Feedback');
    },
    [navigation],
  )
  
  const onFavoritePress = useCallback(() => {
    navigation.navigate('Favorite');
  }, [navigation])
  
  const onInsertionListPress = useCallback(() => {
    dispatch(resetInsertionListAction())
    navigation.navigate('InsertionList');
  }, [navigation])
  
  const onLanguageChange = useCallback((language: string | number | undefined) => {
    const onSuccess: IOnSuccessNoContent = () => {
      RNRestart.Restart();
    }
    dispatch(setLanguageAction(language as string, onSuccess))
  },[],)
  
  return (
    <SafeAreaView style={MAStyles.safe_area}>
      <MyAnibisItem icon={ic_menu_my_listing} label={trans("apps.listings", texts)} count={insertionIds.length} onPress={onInsertionListPress}></MyAnibisItem>
      <MyAnibisItem icon={ic_menu_favorite} label={trans("apps.favorites", texts)} count={favoriteIds.length} onPress={onFavoritePress}></MyAnibisItem>
      <MyAnibisItem icon={ic_menu_login} label={trans("apps.account", texts)} onPress={onLoginAccountPress}></MyAnibisItem>
      <MyAnibisItem icon={ic_menu_about} label={trans("apps.about", texts)} onPress={onAboutPress}></MyAnibisItem>
      <MyAnibisItem icon={ic_menu_feedback} label={trans("apps.feedback", texts)} onPress={onFeedbackPress}></MyAnibisItem>
      <MyAnibisItem icon={ic_menu_setting} label={trans("apps.settings", texts)} onPress={onSettingPress} useTintColor={true}></MyAnibisItem>
      <LanguageSelector
        value={language}
        onChange={onLanguageChange}
        texts={texts}
        isOpen={sortModalOpen}
        onXClick={onSettingClosePress}
      />
    </SafeAreaView>
  );
}