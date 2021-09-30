


// import { Route, Switch, NavLink, Link } from 'react-router-dom'
// import './style.css'
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo, Dispatch, SetStateAction } from 'react';
// import "../filter.css";
import { resolveIsAttributeButtonHasData, resolveAttributeButtonReset, resolveIsAttributeButtonCaption } from '../attribute/attributeFactory';
import { trans } from '../../../utils/common';
import { IXBaseCategory, TAttributeState, TAttributeSetState, IXBaseAttribute, TTextPack } from '../../../utils/xbaseInterface.d';
import {
    Button, View, Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Styles } from './styles';
import { roundedCloseIcon, allFilterIcon } from '../../../utils/assetHelper';
import { useSelector } from 'react-redux';

export interface IFilterButtons {
    categoryFilterButtonCaption: string;
    categoryFilterButtonHasData: boolean;
    onCategoryFilterButtonClick: () => void;
    onCategoryFilterButtonResetClick: () => void;
    locationFilterButtonCaption: string;
    locationFilterButtonHasData: boolean;
    onFilterItemButtonClick: (clickData: string) => void;
    onFilterItemResetButtonClick: (clickData: string) => void;
    onAllFilterButtonClick: () => void;
    xBaseAttributes: Array<IXBaseAttribute>;
    usedInputMaps: Array<[TAttributeState, TAttributeSetState]>;
    location: string;
}
export function FilterButtons(props: IFilterButtons) {
    const {
        categoryFilterButtonCaption,
        categoryFilterButtonHasData,
        onCategoryFilterButtonClick,
        onCategoryFilterButtonResetClick,
        locationFilterButtonCaption,
        locationFilterButtonHasData,
        onFilterItemButtonClick,
        onFilterItemResetButtonClick,
        onAllFilterButtonClick,
        xBaseAttributes,
        usedInputMaps
    } = props;

    const texts = useSelector(state => state.localization.texts);

    function renderResetableButton(clickData: string, label: string, hasData: boolean, onClick: () => void, onResetClick: () => void) {
        return <TouchableOpacity
            key={clickData}
            data-click={clickData}
            style={StyleSheet.compose(Styles.filter_item_button, hasData ? Styles.accent_bg : Styles.white_bg)}
            onPress={onClick}>
            <Text style={StyleSheet.compose(Styles.filter_item_button_label, hasData ? Styles.white_text : Styles.accent_text)}>{label}</Text>
            <TouchableOpacity data-click={clickData} style={{ display: !hasData ? 'none' : 'flex' }} onPress={onResetClick}>
                <Image data-click={clickData} style={Styles.close_icon} source={roundedCloseIcon} />
            </TouchableOpacity>
        </TouchableOpacity>
    }

    const topFiveCatAtts = [xBaseAttributes[0], xBaseAttributes[1], xBaseAttributes[2], xBaseAttributes[3], xBaseAttributes[4]];
    // let firstCatAttHasData = resolveIsAttributeButtonHasData(xBaseAttributes[0], usedInputMaps);
    let priceClickData = topFiveCatAtts[0] && topFiveCatAtts[0].id === 1 ? `${topFiveCatAtts[0].id}-${topFiveCatAtts[0].type}` : "";
    let cityClickData = 'city';
    return <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={Styles.filter_button_scroll} >

        <TouchableOpacity style={Styles.all_filter_button} onPress={onAllFilterButtonClick}>
            <Image data-click={""} style={{ width: 20, height: 20 }} source={allFilterIcon} />
        </TouchableOpacity>

        {renderResetableButton(
            "category",
            categoryFilterButtonCaption,
            categoryFilterButtonHasData,
            onCategoryFilterButtonClick, onCategoryFilterButtonResetClick)}

        {topFiveCatAtts[0] && topFiveCatAtts[0].id === 1 &&
            renderResetableButton(
                priceClickData,
                resolveIsAttributeButtonCaption(xBaseAttributes[0], usedInputMaps),
                resolveIsAttributeButtonHasData(xBaseAttributes[0], usedInputMaps),
                () => onFilterItemButtonClick(priceClickData),
                () => onFilterItemResetButtonClick(priceClickData))}

        {renderResetableButton(
            cityClickData,
            locationFilterButtonCaption,//location ? location :  trans("apps.location", null), 
            locationFilterButtonHasData,//!!location,
            () => onFilterItemButtonClick(cityClickData),
            () => onFilterItemResetButtonClick(cityClickData))}

        {topFiveCatAtts.map(att => {
            let clickData = att && att.id !== 1 ? `${att.id}-${att.type}` : ""
            return att && att.id !== 1 &&
                renderResetableButton(
                    clickData,
                    resolveIsAttributeButtonCaption(att, usedInputMaps),
                    resolveIsAttributeButtonHasData(att, usedInputMaps),
                    () => onFilterItemButtonClick(clickData),
                    () => onFilterItemResetButtonClick(clickData))
        })
        }
        <TouchableOpacity style={Styles.all_filter_text_touch} id="all-filters-Button" onPress={onAllFilterButtonClick}>
            <Text style={Styles.all_filter_text}>{trans("apps.filter", texts)}</Text>
        </TouchableOpacity>
    </ScrollView>;
}