
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
const { initDatabases } = require('./src/utils/xbase/xbase');
const { getAllTexts } = require('./src/utils/xbase/model/textResource');
import {
  StyleSheet,
  useColorScheme,
  View, 
  Image,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Root from './src/navigators/root';
import { useDispatch } from 'react-redux';
import { getLanguageAction, getTextsAction } from './src/redux/actions/actionsLocalization';
import { darkGrayText } from './src/utils/xbaseInterface.d';
import { loginAction } from './src/redux/actions/actionsAuthentication';
import { fetchHistoryListIdsAction } from './src/redux/actions/actionHistoryList';
import { IOnLanguageGet } from './src/redux/actions/action.d';

initDatabases();

const App = () => {
  const [isSplashShown, setIsSplashShown] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSplashShown) {
      setTimeout(() => {
          setIsSplashShown(false)
        }, 3000)
    }
  }, []);

  useEffect(() => {
    const onLanguageGet: IOnLanguageGet = (language: string) => {
      getAllTexts({ lng: language }, (itemMap: any) => {
        dispatch(getTextsAction({ language: language, texts: itemMap }))
      })
    }
    dispatch(getLanguageAction(onLanguageGet))
    dispatch(loginAction(null, (message: string) => { }))
    dispatch(fetchHistoryListIdsAction((message: string) => { }))
  }, [])

  return (
    isSplashShown ?
      <View
        style={styles.splashBg}>
        <Image style={styles.alex} source={require('./assets/alex.png')} />
        <Image style={styles.logoText} source={require('./assets/logo_anibis.png')} />
      </View>
      :
      <NavigationContainer>
        <Root></Root>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashBg: {
    backgroundColor: Colors.white,
    width: '100%', height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  logoContainer: {
    width: '100%', height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alex: {
    width: 200,
    height: 200,
  },
  logoText: {
    width: 200,
    height: 38,
  },
  init_info_text: {
    marginTop: 40,
    fontSize: 12,
    color: darkGrayText,
  },
});

export default App;
