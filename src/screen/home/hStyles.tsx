
import React from 'react';
import {
    StyleSheet, Dimensions,
} from 'react-native';
import { darkGrayText } from "../../utils/xbaseInterface.d";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export const HStyles = StyleSheet.create({
    safeView: {
      flex: 1,
    },
    scroll: {
      flex: 1,
    },
    container: {
      alignItems: 'center',
    },
    logoText: {
      width: 200,
      height: 37,
      marginTop: 35,
      marginBottom: 15,
    },
    termEdit: {
      width: '100%',
      marginTop: 30,
      elevation: 2,
      padding: 10,
    },
    categoriesScroll: {
      width: '100%',
      marginBottom: 40,
    },
    shortcutCategories: {
      flexDirection: 'row',
    },
    galleryContainer: {
      width: '100%',
    },
    lastSearchContainer: {
      width: '100%',
    },
    favoriteContainer: {
      width: '100%',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'dimgray',
      margin: 10,
      flex: 1,
    },
    loading: {
      marginTop: 30,
      marginBottom: 40,
    },
    search_input_container_ios: {
      height: 60,
      width: viewportWidth,
    },
    search_input_container_android: {
      height: 50,
      width: viewportWidth - 24,
      marginVertical: 20,
      marginHorizontal: 12,
      backgroundColor: 'white',
      paddingHorizontal: 16,
      elevation: 3,
      borderRadius: 2,
    },
    search_bar_ios: {
      height: 60,
      width: viewportWidth,
    },
    search_bar_android: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center'
    },
    search_icon: {
      width: 24,
      height: 24,
      tintColor: 'gray'
    },
    search_place_holder: {
      fontSize: 16,
      color: darkGrayText,
      marginLeft: 18,
    },
    list_title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    title_link: {
        marginRight: 10,
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