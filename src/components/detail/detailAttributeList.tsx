
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, Dimensions, TouchableOpacity
} from 'react-native';
import { IXBaseAdvert, TLanguage, XBasePictureS, IDetailAttribute, IXBaseAttribute, XBaseEntryAttributeS, TTextPack } from '../../utils/xbaseInterface.d';
import { favoriteButtonOff, viewFullImageIcon } from '../../utils/assetHelper';
import { Styles } from './styles';
import FullWidthButton from '../../sharedcomponents/button/fullWidthButton';
import Carousel from 'react-native-snap-carousel';
import { SERVER } from '../../utils/network';
import FastImage from 'react-native-fast-image'
import { getDetailAttributeValue } from '../filter/attribute/attributeFactory';
import { attributesByCatId } from '../../utils/xbase/model/attribute';
import { formatDate } from '../../utils/common';
import moment from 'moment';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export interface IDetailBriefInfoProps {
    advert: IXBaseAdvert;
    lng: TLanguage;
    texts: TTextPack;
}
const PRICE_TYPE: number = 207;
const PRICE: number = 1;
const DETAIL_HIDDEN_ATT_IDS: number[] = [PRICE, PRICE_TYPE];

export default function DetailAttributeList(props: IDetailBriefInfoProps) {
    const { advert, lng, texts} = props;
    const [xBaseAttributes, setXBaseAttributes] = useState([]);
    const xBaseCatAttMap = useRef(new Map());
    useEffect(() => {
        attributesByCatId({ id: advert.categoryId, lng, isSearch: false }, (result: any) => {
            setXBaseAttributes(result);
            xBaseCatAttMap.current = new Map();
            result.map((att: IXBaseAttribute) => {
                xBaseCatAttMap.current.set(att.id, att)
            });
        })
    }, [advert, lng]);

    function getAttEntryValue(att: IDetailAttribute): JSX.Element | null {
        let attId = att.attributeId;
        if (!DETAIL_HIDDEN_ATT_IDS.includes(attId)) {
            let type = xBaseCatAttMap.current.get(attId).type;
            return getDetailAttributeValue(att, type,
                () => {
                    const entry = xBaseCatAttMap.current.get(attId).entries.find((entry: XBaseEntryAttributeS) => entry.id === att.attributeEntryId);
                    return <Text>{entry ? entry.name : ("ADS SINCE OLD B.E VERSION, PLEASE REPUBLISH THIS !!!!!")}</Text>;
                },
                () => <Text>to be implemented</Text>,
                () => <Text style={{fontSize: 15}}>{"\u2713"}</Text>,
                () => <Text>{formatDate(att.inputDate)}</Text>,
                () => <Text>{att.inputText}</Text>,
                () => <Text>{att.inputNumber}</Text>,
            )
        }
        else
            return null;
    }

    function getAttRow(att: IDetailAttribute) {
        let attId = att.attributeId;
        if (xBaseCatAttMap.current.get(attId)) {
            let key = xBaseCatAttMap.current.get(attId).name;
            let value = getAttEntryValue(att);
            return value ?
                <View style={Styles.attribute_item}>
                    <Text style={Styles.attribute_item_key}>{key}</Text>
                    <Text style={Styles.attribute_item_value}>{value}</Text>
                </View> :
                null;
        } else {
            return null;
        }
    }

    function getInsertionNumberRow() {
        return <View style={Styles.attribute_item}>
            <Text style={Styles.attribute_item_key}>{"Inseratenumber"}</Text>
            <View style={Styles.attribute_item_value}><Text>{advert._id}</Text></View>
        </View>
    }

    function getOnlineDateRow() {
        return <View style={Styles.attribute_item}>
            <Text style={Styles.attribute_item_key}>{"Aktualisiert"}</Text>
            <View style={Styles.attribute_item_value}><Text>
                {moment(new Date(advert.posted as string)).format("DD-MM-YYYY").toString()}
            </Text></View>
        </View>
    }

    return xBaseAttributes && <View style={Styles.attribute_list_container}>
        {getInsertionNumberRow()}
        {getOnlineDateRow()}
        {xBaseAttributes && advert.attributes && advert.attributes.map(att => {
            return att && getAttRow(att);
        })}
    </View>
}