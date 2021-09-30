// import { Route, Switch, NavLink, Link } from 'react-router-dom'
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext } from 'react';
// import { ValidationContext } from '../../../screens/insert/insert';
// import { getInputClassName } from '../../insert/helper/insertHelper';
// import { RootContext } from '../../../root';
import { trans } from '../../../utils/common';
import { IXBaseAttribute, TAttributeState, TAttributeSetState, IRootContext, IValidationItemInfo, XBaseNumericRangeS, accentColor, darkPlainText, grayBorder, XBaseEntryAttributeS } from '../../../utils/xbaseInterface.d';
import { Text, TextInput, Picker, ViewComponent, View, TouchableOpacity } from 'react-native';
import { FilterStyles } from '../filterStyles';
import { AttributeStyles } from './attributeStyles';
import CheckBox from 'react-native-check-box'
import { useSelector } from 'react-redux';
import moment from 'moment';
const SPACE_TO_SHOW_LABEL = 40;

// function getValueFromDom(event: React.ChangeEvent<HTMLInputElement>): any {
//     console.log('getValueFromDom event.target.value', event.target.value)
//     return event.target.type === "checkbox" ? event.target.checked : event.target.value;
// }

function updateListToValidate(map: Map<number, IValidationItemInfo>, att: IXBaseAttribute, offsetY: number, hasValue: boolean) {
    const newItem: IValidationItemInfo = { name: att.name, offsetY: offsetY, hasValue: hasValue }
    map.set(att.id, newItem);
    console.log('listToValidate updateListToValidate()', map)
}
export type OffsetTopHolder = HTMLInputElement | HTMLSelectElement;

export interface IGetSet {
    get: (item: any) => any;
    set: (item: any, value: any, att: IXBaseAttribute) => void;
}

function useInputMapExtractor(att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], initValue: any, getSets: IGetSet) {
    const texts = useSelector(state => state.localization.texts);
    const ref = useRef<OffsetTopHolder>(null);
    const { get, set } = getSets;
    const validationContext = null;//TODO: INSERT useContext(ValidationContext);
    const rootContext: IRootContext | null = null;//TODO: INSERT useContext(RootContext);
    const [inputMap, setInputMap] = usedInputMap;
    const value = get(inputMap.get(att.id)) || initValue;
    const isValidating = false;//TODO: INSERT validationContext && validationContext.isValidating;
    const listToValidate: Map<number, IValidationItemInfo> = new Map();//TODO: INSERT validationContext && validationContext.info.listToValidate;
    const offsetY = 0;//TODO: INSERT (ref && ref.current) ? (ref.current.offsetTop - SPACE_TO_SHOW_LABEL) : null;
    const className = "";//TODO: INSERT getInputClassName(value, isValidating, att.isMandatory);

    useEffect(() => {
        if (validationContext && att.isMandatory && offsetY != null)
            updateListToValidate(listToValidate, att, offsetY, !!value);
    }, [offsetY]);

    const onValueChange = useCallback(newValue => {
        // const newValue = getValueFromDom(e);
        console.log('newValue', newValue)
        var newInputMap = new Map(inputMap);
        set(newInputMap.get(att.id), newValue, att);
        setInputMap(newInputMap);
        console.log('newInputMap', newInputMap.get(att.id))

        if (validationContext && att.isMandatory && offsetY != null)
            updateListToValidate(listToValidate, att, offsetY, !!newValue);

    }, [inputMap, setInputMap, att, validationContext, listToValidate, set, offsetY]);

    return [value, onValueChange, ref, className, rootContext, texts];
}

function useInputMapExtractorForCheckbox(att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], initValue: any, getSets: IGetSet) {
    const texts = useSelector(state => state.localization.texts);
    const ref = useRef<OffsetTopHolder>(null);
    const { get, set } = getSets;
    const validationContext = null;//TODO: INSERT useContext(ValidationContext);
    const rootContext: IRootContext | null = null;//TODO: INSERT useContext(RootContext);
    const [inputMap, setInputMap] = usedInputMap;
    const value = get(inputMap.get(att.id)) || initValue;
    const isValidating = false;//TODO: INSERT validationContext && validationContext.isValidating;
    const listToValidate: Map<number, IValidationItemInfo> = new Map();//TODO: INSERT validationContext && validationContext.info.listToValidate;
    const offsetY = 0;//TODO: INSERT (ref && ref.current) ? (ref.current.offsetTop - SPACE_TO_SHOW_LABEL) : null;
    const className = "";//TODO: INSERT getInputClassName(value, isValidating, att.isMandatory);

    useEffect(() => {
        if (validationContext && att.isMandatory && offsetY != null)
            updateListToValidate(listToValidate, att, offsetY, !!value);
    }, [offsetY]);

    const onClick = useCallback(() => {
        const newValue = !value;
        var newInputMap = new Map(inputMap);
        set(newInputMap.get(att.id), newValue, att);
        setInputMap(newInputMap);

        if (validationContext && att.isMandatory && offsetY != null)
            updateListToValidate(listToValidate, att, offsetY, !!newValue);

    }, [inputMap, setInputMap, att, validationContext, listToValidate, set, offsetY]);

    return [value, onClick, ref, className, rootContext, texts];
}
function useInputMapExtractorForPicker(att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], initValue: any, getSets: IGetSet) {
    const texts = useSelector(state => state.localization.texts);
    const ref = useRef<OffsetTopHolder>(null);
    const { get, set } = getSets;
    const validationContext = null;//TODO: INSERT useContext(ValidationContext);
    const rootContext: IRootContext | null = null;//TODO: INSERT useContext(RootContext);
    const [inputMap, setInputMap] = usedInputMap;
    const value = get(inputMap.get(att.id)) || initValue;
    const isValidating = false;//TODO: INSERT validationContext && validationContext.isValidating;
    const listToValidate: Map<number, IValidationItemInfo> = new Map();//TODO: INSERT validationContext && validationContext.info.listToValidate;
    const offsetY = 0;//TODO: INSERT (ref && ref.current) ? (ref.current.offsetTop - SPACE_TO_SHOW_LABEL) : null;
    const className = "";//TODO: INSERT getInputClassName(value, isValidating, att.isMandatory);

    useEffect(() => {
        if (validationContext && att.isMandatory && offsetY != null)
            updateListToValidate(listToValidate, att, offsetY, !!value);
    }, [offsetY]);

    const onValueChange = useCallback((itemValue, itemIndex) => {
        const newValue = itemValue;
        var newInputMap = new Map(inputMap);
        set(newInputMap.get(att.id), newValue, att);
        setInputMap(newInputMap);

        if (validationContext && att.isMandatory && offsetY != null)
            updateListToValidate(listToValidate, att, offsetY, !!newValue);

    }, [inputMap, setInputMap, att, validationContext, listToValidate, set, offsetY]);

    return [value, onValueChange, ref, className, rootContext, texts];
}

export interface AttributeProps { id: number | string, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], getSets: IGetSet }
export function AttributeInputText(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractor(att, usedInputMap, "", getSets);
    const result = value ? value : trans("apps.all", texts)
    const style = value ? FilterStyles.filter_item_value : FilterStyles.filter_item_value_all
    return <Text style={style}>{result}</Text>
}

export function AttributeSelect(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractorForPicker(att, usedInputMap, "", getSets);
    const result = value ? ((att.entries as XBaseEntryAttributeS[]).find(item => item.id === value) as XBaseEntryAttributeS).name : trans("apps.all", texts)
    const style = value ? FilterStyles.filter_item_value : FilterStyles.filter_item_value_all
    return <Text style={style}>{result}</Text>
}

export function AttributeSelectMulti(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractor(att, usedInputMap, "", getSets);
    const result = value ? ((att.entries as XBaseEntryAttributeS[]).find(item => item.id === value) as XBaseEntryAttributeS).name : trans("apps.all", texts)
    const style = value ? FilterStyles.filter_item_value : FilterStyles.filter_item_value_all
    return <Text style={style}>{result}</Text>
}

export function AttributeCheckMark(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onClick, ref, className, rootContext, texts] = useInputMapExtractorForCheckbox(att, usedInputMap, false, getSets);
    return <Text style={FilterStyles.filter_item_value}>{trans(value ? "apps.action.yes" : "apps.action.no", texts)}</Text>
}

export function AttributeInputDate(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractor(att, usedInputMap, "", getSets);
    const idString = `${id}`;
    if (idString.endsWith("-from") || idString.endsWith("-to")) {
        let result = value ? moment(value).format("YYYY-MM-DD").toString() : "";
        if (value && (`${id}`).endsWith("-from"))
            result = trans("apps.from", texts) + " " + result + " ";
        if (value && (`${id}`).endsWith("-to"))
            result = trans("apps.to", texts) + " " + result;
        const style = FilterStyles.filter_item_value
        return <Text style={style}>{result}</Text>
    } else {
        let result = value ? moment(value).format("YYYY-MM-DD").toString() : trans("apps.all", texts)
        const style = value ? FilterStyles.filter_item_value : FilterStyles.filter_item_value_all
        return <Text style={style}>{result}</Text>

    }
}

export function AttributeInputNumber(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractor(att, usedInputMap, "", getSets);
    const idString = `${id}`;
    if (idString.endsWith("-from") || idString.endsWith("-to")) {
        let result = value ? value : "";
        if (value && idString.endsWith("-from"))
            result = trans("apps.from", texts) + " " + result + " ";
        if (value && idString.endsWith("-to"))
            result = trans("apps.to", texts) + " " + result;
        const style = FilterStyles.filter_item_value
        return <Text style={style}>{result}</Text>
    } else {
        let result = value ? value : trans("apps.all", texts)
        const style = value ? FilterStyles.filter_item_value : FilterStyles.filter_item_value_all
        return <Text style={style}>{result}</Text>
    }
}