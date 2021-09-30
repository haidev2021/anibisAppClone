import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Image, Button,
} from 'react-native';
import { RootStackParamList } from '../../Type';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screen/home/home'
import Notification from '../screen/notification/notification'
import Insertion from '../screen/insertion/insertion'
import Messenger from '../screen/messenger'
import MyAnibis from '../screen/myAnibis/myAnibis'
import { StackScreenProps } from '@react-navigation/stack';
import { tabs_ic_search, tabs_ic_pn_active, tabs_ic_new_listing, tabs_ic_my_anibis } from '../utils/assetHelper';
import { useSelector } from 'react-redux';
import { trans } from '../utils/common';

const Tab = createBottomTabNavigator<RootStackParamList>();

type Props = StackScreenProps<RootStackParamList, 'Tabs'>;

function selectIcon(routeName: string, focused: boolean, texts: any): JSX.Element {
  let src, style;
  if (routeName === trans("apps.search", texts)) {
    src = tabs_ic_search
  } else if (routeName === trans("apps.notification.title", texts)) {
    src = tabs_ic_pn_active;
  } else if (routeName === trans("apps.insertion", texts)) {
    src = tabs_ic_new_listing;
  } else if (routeName === trans("apps.myanibis", texts)) {
    src = tabs_ic_my_anibis;
  }

  return <Image style={focused ? styles.tabIconFocused : styles.tabIcon} source={src} />;
}

export default function Tabs({ navigation }: Props) {
  const texts = useSelector(state => state.localization.texts)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const texts = useSelector(state => state.localization.texts)
          return selectIcon(route.name, focused, texts);
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3266cc',
        inactiveTintColor: 'darkgray',
      }}
    >
      <Tab.Screen name={trans("apps.search", texts)} component={Home} />
      <Tab.Screen name={trans("apps.insertion", texts)} component={Insertion} />
      <Tab.Screen name={trans("apps.notification.title", texts)} component={Notification} />
      <Tab.Screen name={trans("apps.myanibis", texts)} component={MyAnibis}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 25,
    height: 25,
    tintColor: 'darkgray',
  },
  tabIconFocused: {
    width: 25,
    height: 25,
    tintColor: '#3266cc',
  },
});
