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
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<RootStackParamList, 'Messenger'>;
export default function Messenger({ navigation }: Props) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Messenger Screen</Text>
        <Button
          title="Navigate to Search"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('Search', {
              catId: 113,
              searchTerm: 'iphone',
            });
          }}
        />
      </View>
    );
  }