
// import { Route, Switch, NavLink, Link } from 'react-router-dom'
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext } from 'react';
// import Axios from 'axios';
import AttType, { isSelectType, FORCE_SELECT_SINGLE, ENTRY_ID, ENTRY_IDS, INPUT_TEXT, INPUT_NUMBER, INPUT_DATE, resolveAttributeCheckMark, resolveAttributeInputDate, resolveAttributeInputNumber, resolveAttributeInputText, resolveAttributeSelect, resolveAttributeSelectMulti, resolveAttributeButtonReset, resolveSearchAttribute, resolveSearchAttributeController, } from './attributeFactory';
// import { InsertionContext } from './insert';
// import { RootContext } from '../../../root';
import { trans } from '../../../utils/common';
// import { InsertionContext } from '../../../screens/insert/insert';
import { FilterContext } from '../filter';
import { IXBaseAttribute, TAttributeState, TAttributeSetState, IRootContext } from '../../../utils/xbaseInterface.d';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FilterButtons } from '../buttons/filterButtons';
import { FilterStyles } from '../filterStyles';
import { useSelector } from 'react-redux';

function isSearchFromTo(att: IXBaseAttribute) {
    return att.type === AttType.InputDate || att.type === AttType.InputInt || att.type === AttType.InputDecimal;
}

export interface IAttributeListProps {
    children: any;
    xBaseAttributes: Array<IXBaseAttribute>;
    usedInputMaps: Array<[TAttributeState, TAttributeSetState]>;
    singleFilterItemId: number | string;
    isSearch: boolean;
}

export default function AttributeControllerList(props: IAttributeListProps) {
    const { children: commonAttItem, xBaseAttributes, usedInputMaps, singleFilterItemId, isSearch } = props;
    const texts = useSelector(state => state.localization.texts);
    // const rootContext: IRootContext = useContext(RootContext);
    // const insertionContext = useContext(InsertionContext);
    // const filterContext = useContext(FilterContext);

    const isGeneralFilterOnTop = !xBaseAttributes.find((att: IXBaseAttribute) => att.id === 1);
    const commonFilterDisplay = "city" === singleFilterItemId ? 'flex' : 'none';
    // const resetCommonFilterDisplay = singleFilterItemId && commonFilterDisplay === 'flex' ? 'flex' : 'none';

    function getcommonAttItem() {
        return <View style={StyleSheet.compose(FilterStyles.filter_item, { display: commonFilterDisplay })}>
            {commonAttItem}
        </View>
    }
    const onAttributeResetButtonClick = useCallback((clickData) => {
        const [id, type] = clickData.split("-");
        if (id && type) {
            resolveAttributeButtonReset({ id: Number.parseInt(id), type: Number.parseInt(type) }, usedInputMaps)
        }
    }, [usedInputMaps])

    return <Fragment>
        {isGeneralFilterOnTop && getcommonAttItem()}
        {xBaseAttributes.map(att => {
            const id = att.id + "-" + (isSearch ? "search" : "insert");
            const attDisplay = !singleFilterItemId || att.id == singleFilterItemId ? 'flex' : 'none';
            const resetButtonDisplay = singleFilterItemId && attDisplay === 'flex' ? 'flex' : 'none';
            const clickData = `${att.id}-${att.type}`;
            return <Fragment>
                {attDisplay == 'flex' && <View key={id} style={StyleSheet.compose(FilterStyles.filter_item, { display: attDisplay })}>
                    {/* <Text>{singleFilterItemId}{attDisplay}</Text> */}
                    {/* <Text style={FilterStyles.filter_item_key}>
                        {att.name}
                    </Text> */}
                    {resolveSearchAttributeController(id, att, usedInputMaps, isSearch)}

                    {/* {insertionContext && <Text id="validation-hint">{trans("apps.new.checkmandatoryfield", null)}</Text>} */}

                    <TouchableOpacity onPress={() => onAttributeResetButtonClick(clickData)}
                        style={{ display: resetButtonDisplay }}>
                        <Text style={FilterStyles.reset_link}>{trans("apps.action.reset", texts)}</Text>
                    </TouchableOpacity>
                </View>}

                {!isGeneralFilterOnTop && att.id === 1 && getcommonAttItem()}

            </Fragment>
        })}
    </Fragment>
}
