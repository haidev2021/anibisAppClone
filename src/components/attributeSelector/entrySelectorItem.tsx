

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
import { ic_category_check } from '../../utils/assetHelper';

export interface IEntrySelectorItem {
    key: string | number,
    isSelected: boolean,
    onSelect: (value: string | number | undefined) => void,
    value: string | number | undefined;
    label: string,
}
export function EntrySelectorItem(props: IEntrySelectorItem) {
    const {key, value, isSelected, onSelect, label } = props
    return <TouchableOpacity key={key} style={Styles.parent_category} onPress={() => onSelect(value)} key={value}>
        <View style={Styles.category_texts_container}>
            <Text style={isSelected ? Styles.category_name_selected : Styles.category_name}>{label}</Text>
        </View>
        {isSelected && <Image style={Styles.category_selected_icon} source={ic_category_check}></Image>}
    </TouchableOpacity>
}