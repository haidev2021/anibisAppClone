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

import CenterAnchoredModal from '../../../sharedcomponents/centerAnchoredModal/centerAnchoredModal';
import DatePicker from 'react-native-date-picker'
import { useSelector } from 'react-redux';
import { EntrySelectorItem } from '../../attributeSelector/entrySelectorItem';
import { FocusableInput } from '../../../sharedcomponents/focusableInput/focusableInput';

const SPACE_TO_SHOW_LABEL = 40;

function getValueFromDom(event: React.ChangeEvent<HTMLInputElement>): any {
    console.log('getValueFromDom event.target.value', event.target.value)
    return event.target.type === "checkbox" ? event.target.checked : event.target.value;
}

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
    const texts = useSelector(state => state.localization.texts);

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
    const texts = useSelector(state => state.localization.texts);

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
    const texts = useSelector(state => state.localization.texts);

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
export function AttributeInputTextController(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractor(att, usedInputMap, "", getSets);
    return <View style={FilterStyles.filter_item_input_text}>
        <FocusableInput
            label={"" + att.name}
            value={value}
            onValueChange={onValueChange}
        />
    </View>
}

export function AttributeSelectController(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractorForPicker(att, usedInputMap, "", getSets);
    return <Fragment>
        <EntrySelectorItem key={id} value={undefined} label={trans("apps.any", texts)} onSelect={onValueChange}
            isSelected={!value} />
        {att.entries && att.entries.map((entry) => {
            return <EntrySelectorItem key={entry.id} value={entry.id} label={entry.name} onSelect={onValueChange}
                isSelected={value == entry.id} />
        })}
    </Fragment>
}

export function AttributeSelectMultiController(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractor(att, usedInputMap, "", getSets);
    return <Picker ref={ref} id={"" + id} className={className} multiple onValueChange={onValueChange} value={value}>
        {<Picker.Item selected value={""}> {trans("apps.any", texts)} </Picker.Item>}
        {att.entries && att.entries.map(entry => {
            let optionId = id + "-" + entry.id;
            return <Picker.Item id={optionId} value={entry.id} label={entry.name}></Picker.Item>
        })}
    </Picker>
}

export function AttributeCheckMarkController(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onClick, ref, className, rootContext, texts] = useInputMapExtractorForCheckbox(att, usedInputMap, false, getSets);
    return <CheckBox ref={ref} id={"" + id} type="checkbox" name="" onClick={onClick} isChecked={value} />
}

export function AttributeInputDateController(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractor(att, usedInputMap, "", getSets);
    console.log(`AttributeInputDateController value`, value)
    const idString = `${id}`;
    let label = `${att.name}`;
    if (idString.endsWith("-from"))
        label = "apps.from";
    if (idString.endsWith("-to"))
        label = "apps.to";
    return <View style={FilterStyles.filter_item_input_text}>
        <DatePicker date={value} onDateChange={onValueChange} />
    </View>
}

export function AttributeInputNumberController(props: AttributeProps): JSX.Element {
    const { id, att, usedInputMap, getSets } = props;
    const [value, onValueChange, ref, className, rootContext, texts] = useInputMapExtractor(att, usedInputMap, "", getSets);
    const idString = `${id}`;
    let label = `${att.name} ${att.unit}`;
    if (idString.endsWith("-from"))
        label = trans("apps.from", texts) + " " + att.unit;
    if (idString.endsWith("-to"))
        label = trans("apps.to", texts) + " " + att.unit;
    return <View style={FilterStyles.filter_item_input_text}>
        <FocusableInput
            label={label}
            value={"" + value}
            onValueChange={onValueChange}/>
    </View>
}