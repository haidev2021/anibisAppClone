import React, { useState, useEffect, useCallback, Fragment, useMemo, useRef, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Image, Button, Alert,
} from 'react-native';
import { RootStackParamList } from '../../../Type';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Filter } from '../../components/filter/filter';
import { useSelector, useDispatch } from 'react-redux';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import { trans, formatNumber } from '../../utils/common';
import { img_add_image, ic_online_checkmark } from '../../utils/assetHelper';
import { IStyles } from './iStyles';
import { LoginFragment } from '../../components/login/loginFragment';
import { InsertionGeneralInput } from '../../components/insertion/insertionGeneralInput';
import { InsertionContactType } from '../../components/insertion/insertionContactType';
import { InsertionPhone } from '../../components/insertion/insertionPhone';
import { CONTACT_TYPE_FORM_ONLY } from '../../components/insertion/contactTypeSelectorModal';
import { InsertionLocation } from '../../components/insertion/insertionLocattion';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { fLog } from '../../utils/utils';
import { SERVER, IMAGE_UPLOAD_API } from '../../utils/network';
import PhotoSelector from '../../components/insertion/photo/photoSelector';
import PlainText from '../../sharedcomponents/plainText/plainText';
import { IXBaseAttribute, XBasePictureS, IXBaseCategory, TAttributeState, TXBaseAttributes, IXBaseAdvert, IDetailAttribute } from '../../utils/xbaseInterface.d';
import { newInsertAction, updateInsertAction } from '../../redux/actions/actionInsert';
import InsertionDetail from '../../components/insertionDetail/insertionDetail';
import { resetInsertionListAction } from '../../redux/actions/actionsInsertionList';
var RNFS = require('react-native-fs');
const TAG = "insert"

const PRICE_TYPE = 207;
const PRICE = 1;
const FIXED_PRICE = 15218;

function getPriceText(priceNumber: number, priceEntryId: number, priceType: string) {
  let priceNumberFormatted = `CHF ${formatNumber(priceNumber)}.-`;
  return priceNumber === 0 ? priceType : (priceEntryId === FIXED_PRICE ? priceNumberFormatted : priceNumberFormatted + " / " + priceType)
}

function updatePrice(entriedAttributeMap: TAttributeState, xBaseAttributes: TXBaseAttributes) {
  let price = "";
  if (entriedAttributeMap && xBaseAttributes && xBaseAttributes.length > 0) {
    let priceNumber = entriedAttributeMap.get(PRICE) ? entriedAttributeMap.get(PRICE).inputNumber : null;
    let priceEntryId = entriedAttributeMap.get(PRICE_TYPE) ? entriedAttributeMap.get(PRICE_TYPE).attributeEntryId : null;
    let priceTypeAtt = xBaseAttributes.find((att: IXBaseAttribute) => att.id === PRICE_TYPE);
    let allEntries = priceTypeAtt && priceTypeAtt.entries;
    let priceEntry = allEntries && allEntries.find((ent: XBaseEntryAttributeS) => ent.id === priceEntryId);
    let priceType = priceEntry && priceEntry.name || "";
    price = priceEntryId && priceType ? getPriceText(priceNumber, priceEntryId, priceType) : "";
  }
  return price;
}

function refineForSearchAndDetail(entriedAttributes: Array<IDetailAttribute>) {
  let typeAttNo208 = entriedAttributes.shift();
  entriedAttributes.push(typeAttNo208);
  return entriedAttributes;
}

export default function Insertion({ route, navigation }: BottomTabScreenProps<RootStackParamList, 'EditInsertion'>) {
  const { editInsertion } = route && route.params ? route.params : { editInsertion: null };
  const language = useSelector(state => state.localization.language);
  const texts = useSelector(state => state.localization.texts);
  const token = useSelector(state => state.authentication.token);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [attributeError, setAttributeError] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("CH");
  const [addressError, setAddressError] = useState("");
  const [contactType, setContactType] = useState(0);
  const [areaPhoneCode, setAreaPhoneCode] = useState("+41");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [successAdvert, setSuccessAdvert] = useState(null);
  const [publishPressFlag, setPublishPressFlag] = useState(false)
  const [publishFlag, setPublishFlag] = useState(false)

  const imageArrayRef = useRef<XBasePictureS[]>([]);
  const thumbRef = useRef<string>(null);
  const categoryRef = useRef<IXBaseCategory>(null);
  const categoryPathRef = useRef<number[]>([]);
  const attributeInputMapRef = useRef<IXBaseCategory | null>(null);
  const priceRef = useRef(null);
  const xBaseAttributesRef = useRef<IXBaseAttribute[] | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editInsertion) {
      setTitle(editInsertion.title);
      setDescription(editInsertion.description);
      let editAddress = editInsertion.contactAddress;
      setStreet(editAddress.street);
      setZip("" + editAddress.zip);
      setCity("" + editAddress.city);
      setCountry(editAddress.countryCode);
      let editPhoneSplitted = editAddress.phone ? editAddress.phone.split(' ') : null;
      setAreaPhoneCode(editPhoneSplitted && editPhoneSplitted.length == 2 ? editPhoneSplitted[0] : "");
      setPhone(editPhoneSplitted && editPhoneSplitted.length == 2 ? editPhoneSplitted[1] : "");
    }
  }, [editInsertion])

  const onImageChange = useCallback((images: XBasePictureS[]) => {
    fLog(TAG, 'onImageChange images = ', images);
    imageArrayRef.current = images;
    thumbRef.current = images && images.length > 0 ? images[0].blogPhotosThumbnail : null;
  }, [thumbRef])

  const onCategoryChange = useCallback((category, flushModalInputFlag) => {
    categoryRef.current = category;
  }, [categoryRef]);

  const onCategoryPathChange = useCallback((categoryPath, flushModalInputFlag) => {
    categoryPathRef.current = Array.from(categoryPath, (item: IXBaseCategory) => item.id);
  }, []);

  const onAttChange = useCallback((map) => {
    fLog(TAG, 'onAttChange attributeInputMapRef.current = ', attributeInputMapRef.current);
    let newMap = attributeInputMapRef.current ? new Map([...attributeInputMapRef.current, ...map]) : map;
    attributeInputMapRef.current = newMap;
    priceRef.current = updatePrice(attributeInputMapRef.current, xBaseAttributesRef.current)
  }, [attributeInputMapRef, priceRef, xBaseAttributesRef]);

  const onXBaseAttributeChange = useCallback((atts: Array<IXBaseAttribute>) => {
    xBaseAttributesRef.current = atts;
  }, [xBaseAttributesRef])

  const errors = [titleError, descriptionError, categoryError, attributeError, addressError, phoneError];

  const handlePublish = useCallback(() => {
    fLog(TAG, 'handlePublish errors = ', errors);
    if (errors.findIndex(e => e != "") == -1) {
      fLog(TAG, 'Validating success attributeInputMapRef.current = ', attributeInputMapRef.current);
      fLog(TAG, 'Validating success refineForSearchAndDetail = ', refineForSearchAndDetail(Array.from(attributeInputMapRef.current.values())));
      const advert = {
        language: language,
        categoryId: categoryRef.current ? categoryRef.current.id : null,
        attributes: attributeInputMapRef.current && refineForSearchAndDetail(Array.from(attributeInputMapRef.current.values())),
        pictures: imageArrayRef.current,
        contactAddress: {
          street: street,
          zip: Number.parseInt(zip),
          city: city,
          phone: phone ? areaPhoneCode + " " + phone : "",
          countryCode: country,
          contactType: contactType,
          latitude: 0,
          longitude: 0,
          allowEMail: true,
        },
        title: title,
        description: description,
        price: "" + priceRef.current,
        categoryPath: categoryPathRef.current,
        thumbnail: thumbRef.current,
        // user: loginInfo,
        // state: editAdvertState,
        state: editInsertion ? editInsertion.state : null,
      }
      const onSuccess = (successAdvert: IXBaseAdvert) => {
        setSuccessAdvert(successAdvert);
      }
      const onError = (error: string) => {
        Alert.alert(
          trans("apps.message.otherfail", texts),
          "" + error,
          [{ text: trans("apps.action.ok", texts), onPress: () => { } }]
        );
      }
      if (!editInsertion)
        dispatch(newInsertAction({ advert, onSuccess, onError }))
      else {
        let updateObject = { id: editInsertion._id, set: advert }
        dispatch(updateInsertAction(updateObject, onSuccess, onError))
      }
    }
  }, [editInsertion, errors, language, categoryRef, attributeInputMapRef,
    imageArrayRef, street, zip, city, phone, areaPhoneCode, country, contactType,
    title, description, priceRef, categoryPathRef, thumbRef,])

  const onPublishPress = useCallback(() => {
    setIsValidating(true);
    setPublishPressFlag(true);
  }, [handlePublish])

  useEffect(() => {
    if (publishPressFlag) {
      setPublishFlag(true);
      setPublishPressFlag(false);
    }
  }, [publishPressFlag])

  useEffect(() => {
    if (publishFlag) {
      handlePublish();
      setPublishFlag(false);
    }
  }, [publishFlag])


  fLog(TAG, 'render errors = ', errors);

  const onNewInsertPress = useCallback(() => {
    if (editInsertion) {
      navigation.navigate(trans("apps.insertion", texts));
    } else {
      setSuccessAdvert(null);
      setTitle("");
      setDescription("");
      setIsValidating(false);
    }
  }, [editInsertion])

  const onInsertionListPress = useCallback(() => {
    dispatch(resetInsertionListAction())
    navigation.navigate('InsertionList');
  }, [])

  return (
    <SafeAreaView style={IStyles.safe_area_view}>
      {!token ?
        <LoginFragment showLoginTitle={true} /> :
        (!successAdvert ?
          <Fragment>
            <ScrollView style={IStyles.scroll_view}>
              {errors.find(e => e != "") && <View style={IStyles.height20}></View>}
              {errors.map(e => e != "" ? <PlainText style={IStyles.top_validation_text} text={e}></PlainText> : null)}
              {errors.find(e => e != "") && <View style={IStyles.height20}></View>}
              <PhotoSelector
                editPhotos={editInsertion ? editInsertion.pictures : null}
                onImageChange={onImageChange} />
              <InsertionGeneralInput
                label={trans("apps.hinttitle", texts)}
                value={title}
                onValueChange={setTitle}
                isValidating={isValidating}
                error={trans("apps.insertion.errortitleempty", texts)}
                onError={setTitleError} />
              <InsertionGeneralInput
                label={trans("apps.hintdescription", texts)}
                value={description}
                onValueChange={setDescription}
                isValidating={isValidating}
                error={trans("apps.insertion.errordescriptionempty", texts)}
                onError={setDescriptionError} />
              <Filter
                editInputs={editInsertion}
                commonFilter={null}
                isSearch={false}
                isValidating={isValidating}
                onCategoryChange={onCategoryChange}
                onCategoryPathChange={onCategoryPathChange}
                onInputNumberChange={onAttChange}
                onInputDateChange={onAttChange}
                onInputTextChange={onAttChange}
                onSingleEntrySelectChange={onAttChange}
                onMultiEntrySelectChange={onAttChange}
                onXBaseAttributeChange={onXBaseAttributeChange}
                searchCounts={new Map()}
                onCategoryError={setCategoryError}
                onAttributeError={setAttributeError}
              ></Filter>
              <InsertionLocation
                label={trans("apps.insertion.contact.location", texts)}
                street={street}
                country={country}
                onStreetChange={setStreet}
                onCountryChange={setCountry}
                city={city}
                zip={zip}
                onCityChange={setCity}
                onZipChange={setZip}
                isValidating={isValidating}
                onError={setAddressError}></InsertionLocation>
              <InsertionContactType
                value={contactType}
                onValueChange={setContactType}></InsertionContactType>
              <InsertionPhone
                style={{ display: contactType == CONTACT_TYPE_FORM_ONLY ? 'none' : 'flex' }}
                areaCode={areaPhoneCode}
                phone={phone}
                onAreaCodeChange={setAreaPhoneCode}
                onPhoneChange={setPhone}
                texts={texts}
                isValidating={isValidating}
                onError={setPhoneError}></InsertionPhone>
            </ScrollView>
            <View style={IStyles.buffer}></View>
            <FullWidthButton
              style={IStyles.button_publish}
              isPrimary={true}
              text={trans('apps.action.publish', texts)}
              onPress={onPublishPress}></FullWidthButton>
          </Fragment> :
          <Fragment>
            <View style={IStyles.preview_hint}>
              <Text style={IStyles.preview_hint_text}>{trans("apps.myadinpreview", texts)}</Text>
              <Image style={IStyles.ic_online_checkmark} source={ic_online_checkmark}></Image>
            </View>
            <InsertionDetail insertion={successAdvert} navigation={navigation}>
              <FullWidthButton text={trans("apps.action.newad", texts)} onPress={onNewInsertPress} isPrimary={true} />
              <FullWidthButton text={trans("apps.listings", texts)} onPress={onInsertionListPress} isPrimary={false} />
            </InsertionDetail>
          </Fragment>
        )}
    </SafeAreaView>
  );
}