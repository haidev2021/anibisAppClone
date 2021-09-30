


import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../Type';
import Tabs from './tabs';
import Search from '../screen/search';
import { Platform } from 'react-native';
import Login from '../screen/login/login';
import About from '../screen/about/about';
import Feedback from '../screen/feedback/feeback';
import Favorite from '../screen/favorite/favorite';
import History from '../screen/history/history';
import { useSelector } from 'react-redux';
import UserListing from '../screen/userListing/userListing';
import NestedDetailPager from '../screen/detailPager/nestedDetailPager';
import DetailPager from '../screen/detailPager/detailPager';
import InsertionList from '../screen/insertionList/insertionList';
import SingleDetail from '../screen/singleDetail/singleDetail';
import Insertion from '../screen/insertion/insertion';
const Stack = createStackNavigator<RootStackParamList>();
export default function Root() {
  const texts = useSelector(state => state.localization.texts)
    return (
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
          <Stack.Screen name="Search" component={Search} options={{ headerShown: Platform.OS === 'ios'}}/>
          <Stack.Screen name="DetailPager" component={DetailPager} />
          <Stack.Screen name="NestedDetailPager" component={NestedDetailPager} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Favorite" component={Favorite} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="UserListing" component={UserListing} />
          <Stack.Screen name="InsertionList" component={InsertionList} />
          <Stack.Screen name="SingleDetail" component={SingleDetail} />
          <Stack.Screen name="EditInsertion" component={Insertion} />
        </Stack.Navigator>
    );
  }