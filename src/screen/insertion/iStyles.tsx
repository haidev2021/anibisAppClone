
import React from 'react';
import {
  StyleSheet, Dimensions,
} from 'react-native';
import { darkGrayText, grayShadow, grayBg } from "../../utils/xbaseInterface.d";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export const IStyles = StyleSheet.create({
  safe_area_view: {
    flex: 1
  },
  scroll_view: {
    flex: 1,
    backgroundColor:
      'white',
  },
  top_validation_text: {
    // padding: 20,
    color: 'crimson',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  height20: {
    width: 0,
    height: 20,
  },
  img_add_image: {
    width: 100,
    height: 80,
  },
  image_gallery_container: {
    width: viewportWidth,
    height: viewportWidth * 3 / 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: grayBg,
    padding: 20,
  },
  button_add_image: {
    position: 'absolute',
    bottom: 20,
  },
  button_publish: {
    position: 'absolute',
    bottom: 0,
  },
  buffer: {
    width: 0,
    height: 40,
  },
  preview_hint: {
    backgroundColor: 'orange',
    margin: 10,
    alignItems: 'center',
    borderRadius: 3,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  preview_hint_text: {
    color: 'white',
    margin: 10,
    flex: 1,
    fontSize: 15,
  },
  ic_online_checkmark: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});