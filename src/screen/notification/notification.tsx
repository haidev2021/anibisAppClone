import React, { useState, useEffect, useCallback } from 'react';
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
import { NStyles } from './nStyles';
import Title from '../../sharedcomponents/title/title';
import { useSelector } from 'react-redux';
import { trans } from '../../utils/common';
import PlainText from '../../sharedcomponents/plainText/plainText';
import UpperCasedLink from '../../sharedcomponents/button/upperCasedLink';

type Props = BottomTabScreenProps<RootStackParamList, 'Notification'>;
export default function Notification({ navigation }: Props) {
  const texts = useSelector(state => state.localization.texts);
  
  const onSearchPress = useCallback(() => {
    navigation.navigate(trans("apps.search", texts))
  },[navigation],)

  return (<SafeAreaView style={NStyles.safe_view}>
    <View style={NStyles.container}>
      <Title style={NStyles.title} text={trans("apps.notification.inactive", texts)}></Title>
      <PlainText style={NStyles.message} text={trans("apps.notification.inactive.message", texts)}></PlainText>
      <View style={NStyles.separator} ></View>
      <UpperCasedLink style={NStyles.message} text={trans("apps.action.search", texts)} onPress={onSearchPress}></UpperCasedLink>
    </View>
  </SafeAreaView>
  );
}