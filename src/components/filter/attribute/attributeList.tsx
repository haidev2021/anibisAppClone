
// import { Route, Switch, NavLink, Link } from 'react-router-dom'
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, SetStateAction, Dispatch } from 'react';
// import Axios from 'axios';
import AttType, {
    isSelectType, FORCE_SELECT_SINGLE, ENTRY_ID, ENTRY_IDS, INPUT_TEXT, INPUT_NUMBER, INPUT_DATE,
    resolveAttributeCheckMark, resolveAttributeInputDate, resolveAttributeInputNumber, resolveAttributeInputText,
    resolveAttributeSelect, resolveAttributeSelectMulti, resolveSearchAttribute, resolveAttributeButtonReset,
    resolveSearchAttributeKeyValue,
    resolveSearchAttributeController,
    resolveIsAttributeButtonHasData
} from './attributeFactory';
// import { InsertionContext } from './insert';
// import { RootContext } from '../../../root';
import { trans } from '../../../utils/common';
// import { InsertionContext } from '../../../screens/insert/insert';
import { FilterContext } from '../filter';
import { IXBaseAttribute, TAttributeState, TAttributeSetState, IRootContext } from '../../../utils/xbaseInterface.d';
import { View, Text, TouchableOpacity } from 'react-native';
import { FilterButtons } from '../buttons/filterButtons';
import { FilterStyles } from '../filterStyles';
import CenterAnchoredModal from '../../../sharedcomponents/centerAnchoredModal/centerAnchoredModal';
import AttributeControllerList from './attributeControllerList';
import { LocationSearchController } from '../locationSearchController';
import MandatoryAlertMark from '../../../sharedcomponents/mandatoryAlert/mandatoryAlertMark';
import { useSelector } from 'react-redux';

function isSearchFromTo(att: IXBaseAttribute) {
    return att.type === AttType.InputDate || att.type === AttType.InputInt || att.type === AttType.InputDecimal;
}

export interface IAttributeListProps {
    children: any;
    xBaseAttributes: Array<IXBaseAttribute>;
    usedInputMaps: Array<[TAttributeState, TAttributeSetState]>;
    singleFilterItemId: number | string;
    setSingleFilterItemId: Dispatch<SetStateAction<number | string>>;
    setIsControllerOpened: Dispatch<SetStateAction<boolean>>;
    pushCurrentFilterInput: (debugInfo: string) => void;
    isSearch: boolean;
    isValidating?: boolean;
    onAttributeError?: (error: string) => void;
}

export default function AttributeKeyValueList(props: IAttributeListProps) {
    const { children: commonAttItem, xBaseAttributes, usedInputMaps, singleFilterItemId,
        setSingleFilterItemId, setIsControllerOpened, pushCurrentFilterInput, isSearch, isValidating, onAttributeError } = props;
    // const rootContext: IRootContext = useContext(RootContext);
    // const insertionContext = useContext(InsertionContext);
    // const filterContext = useContext(FilterContext);
    const texts = useSelector(state => state.localization.texts);

    const isGeneralFilterOnTop = !xBaseAttributes.find((att: IXBaseAttribute) => att.id === 1);
    // const commonFilterDisplay = !singleFilterItemId || "city" === singleFilterItemId ? 'flex' : 'none';
    // const resetCommonFilterDisplay = singleFilterItemId && commonFilterDisplay === 'flex' ? 'flex' : 'none';

    const onFilterItemPress = useCallback((attId) => {
        setIsControllerOpened(true);
        setSingleFilterItemId(attId);
        pushCurrentFilterInput("onFilterItemPress")
    }, [setIsControllerOpened, pushCurrentFilterInput, setSingleFilterItemId])

    useEffect(() => {
        if (onAttributeError) {
            const errors: string[] = [];
            xBaseAttributes.map(att => {
                if (isValidating && att.isMandatory == 1 && !resolveIsAttributeButtonHasData(att, usedInputMaps))
                    errors.push(att.name as string)
            })
            onAttributeError(errors.length > 0 ?
                trans('apps.checkmandatoryfield', texts).replace(".", ": ") + errors.reduce((acc, e) => acc + ", " + e) :
                "")
        }
    }, [usedInputMaps, isValidating, xBaseAttributes, onAttributeError])

    function getcommonAttItem() {
        if (commonAttItem) {
            var clonedElementWithMoreProps = React.cloneElement(
                commonAttItem,
                { onFilterItemPress: onFilterItemPress }
            );
            return <View style={FilterStyles.filter_group}>
                {clonedElementWithMoreProps}
            </View>
        } else {
            return null;
        }
    }
    function getAttView(att: IXBaseAttribute, id: string): JSX.Element {
        return <TouchableOpacity key={id} style={FilterStyles.filter_item} onPress={() => onFilterItemPress(att.id)}>
            <Text style={FilterStyles.filter_item_key}>{att.name}</Text>
            {resolveSearchAttribute(att.id, att, usedInputMaps, isSearch)}
            {/* {insertionContext && <Text id="validation-hint">{trans("apps.new.checkmandatoryfield", null)}</Text>} */}
            {isValidating && att.isMandatory == 1 && !resolveIsAttributeButtonHasData(att, usedInputMaps) && <MandatoryAlertMark></MandatoryAlertMark>}
        </TouchableOpacity>
    }

    return <Fragment>
        {isGeneralFilterOnTop && getcommonAttItem()}
        {xBaseAttributes.map(att => {
            const id = att.id + "-" + (isSearch ? "search" : "insert");
            // const attDisplay = !singleFilterItemId || att.id == singleFilterItemId ? 'flex' : 'none';
            // const resetButtonDisplay = singleFilterItemId && attDisplay === 'flex' ? 'flex' : 'none';
            return <Fragment>
                {att.id === 1 ? <View key={id} style={FilterStyles.filter_group}>{getAttView(att, id)}</View> : getAttView(att, id)}
                {!isGeneralFilterOnTop && att.id === 1 && getcommonAttItem()}
            </Fragment>
        })}
    </Fragment >
}
