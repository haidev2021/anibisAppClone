
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal, TouchableOpacity,
} from 'react-native';

import { Styles } from './styles';

export interface ICategorySearchCountItem {
    name: string,
    subTitle?: string,
    isHistory: boolean,
    isParent: boolean,
    isSelected: boolean,
    onPress: () => void,
    style: any,
    key: string;
}
export function CategorySearchCountItem(props: ICategorySearchCountItem) {
    const { name, subTitle, isHistory, isParent, isSelected, onPress, style, key } = props
    return <TouchableOpacity style={style} onPress={onPress} key={key}>
        <View style={Styles.category_texts_container}>
            <Text style={isSelected ? Styles.category_name_selected : Styles.category_name}>{name}</Text>
            <Text style={Styles.sub_title}>{subTitle ? subTitle : ""}</Text>
        </View>
        {isSelected && <Image style={Styles.category_selected_icon} source={require('../../../assets/ic_category_check.png')}></Image>}
        {!isHistory && !isSelected && <Image style={Styles.category_exapnd_icon} source={require('../../../assets/ic_category_expand.png')}></Image>}
    </TouchableOpacity>
}