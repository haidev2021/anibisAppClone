
import React from 'react';
import { AttributeSelect, AttributeInputText, AttributeSelectMulti, AttributeCheckMark, AttributeInputDate, AttributeInputNumber, IGetSet } from './attribute';
import moment from 'moment';
import { IXBaseAttribute, IDetailAttribute, TAttributeState, TAttributeSetState, XBaseEntryAttributeS } from '../../../utils/xbaseInterface.d';
import { View, Text } from 'react-native';
import { AttributeInputNumberController, AttributeInputDateController, AttributeSelectController, AttributeSelectMultiController, AttributeCheckMarkController, AttributeInputTextController } from './attributeController';
import { FilterStyles } from '../filterStyles';
import { fLog } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { trans } from '../../../utils/common';

const AttType = Object.freeze({
    Undefined: 0, SelectSingle: 1, SelectMulti: 2,
    SelectMultiSearchSingle: 3, InputText: 4, InputTextSuggest: 5,
    InputInt: 6, InputDecimal: 7, InputDate: 8,
    Checkmark: 9, SelectSingleExt: 10, SelectSingleSearchMulti: 11,
});

export const INPUT_NUMBER = 0;
export const INPUT_DATE = 1;
export const ENTRY_ID = 2;
export const ENTRY_IDS = 3;
export const INPUT_TEXT = 4;
export const ATT_MAP_IDS = [INPUT_NUMBER, INPUT_DATE, ENTRY_ID, ENTRY_IDS, INPUT_TEXT];
export default AttType;

const TAG = "AttributeFactory"

function normaliseInteger(value: string) {
    let result = value ? Number.parseInt(value) : null;
    return result;
}

function normaliseFloat(value: string) {
    return value ? Number.parseFloat(value) : null;
}

export const attributeGetSetBase = [
    {
        get: (key = "inputNumber") => (item: any) => item && item[key],
        set: (key = "inputNumber") => (item: any, value: string, att: IXBaseAttribute) => { item[key] = (att.type === AttType.InputInt) ? normaliseInteger(value) : normaliseFloat(value) }
    },
    {
        get: (key = "inputDate") => (item: any) => item && item[key],
        set: (key = "inputDate") => (item: any, value: Date, att: IXBaseAttribute) => { item[key] = value; }
    },
    {
        get: (key = "attributeEntryId") => (item: any) => item && item[key],
        set: (key = "attributeEntryId") => (item: any, value: string, att: IXBaseAttribute) => { item[key] = (att.type === AttType.Checkmark) ? (value ? att.entries[0].id : null) : (value ? normaliseInteger(value) : null) }
    },
    {
        get: (key = "attributeEntryIds") => (item: any) => item && item[key],
        set: (key = "attributeEntryIds") => (item: any, value: string, att: IXBaseAttribute) => { item[key] = Array.from(value.split(","), entry => Number.parseInt(entry)) }
    },
    {
        get: (key = "inputText") => (item: any) => item && item[key],
        set: (key = "inputText") => (item: any, value: string, att: IXBaseAttribute) => { item[key] = value }
    },];

export const attributeGetSets = Array.from(attributeGetSetBase, cbs => ({ get: cbs.get(), set: cbs.set() }));

const extractGetSet = ([index, key]: [number, string]) => ({ get: attributeGetSetBase[index].get(key), set: attributeGetSetBase[index].set(key) });

export const attributeFromGetSets = Array.from([[INPUT_NUMBER, "inputNumberFrom"], [INPUT_DATE, "inputNumberFrom"]], extractGetSet);

export const attributeToGetSets = Array.from([[INPUT_NUMBER, "inputNumberTo"], [INPUT_DATE, "inputDateTo"]], extractGetSet);

export function isSelectType(type: number) {
    return type === 1 || type === 2 || type === 3 || type === 10 || type === 11;
}

export function isSelectMultiType(type: number) {
    return type === 2 || type === 3;
}

export const FORCE_SELECT_SINGLE = true;

export function getFilterAttributeMapId(attType: number) {
    if (FORCE_SELECT_SINGLE && isSelectType(attType)) {
        return ENTRY_ID;
    } else if (!FORCE_SELECT_SINGLE && isSelectMultiType(attType)) {
        return ENTRY_IDS;
    } else if (attType === AttType.Checkmark) {
        return ENTRY_ID;
    } else if (attType === AttType.InputDate) {
        return INPUT_DATE;
    } else if (attType === AttType.InputText || attType === AttType.InputTextSuggest) {
        return INPUT_TEXT;
    } else if (attType === AttType.InputInt || attType === AttType.InputDecimal) {
        return INPUT_NUMBER;
    }
}
export type AttributeElementCallback = () => JSX.Element;
export function getDetailAttributeValue(att: IDetailAttribute, type: number, selectCb: AttributeElementCallback,
    mutilSelctCb: AttributeElementCallback, checkmarkCb: AttributeElementCallback,
    dateCb: AttributeElementCallback, textCb: AttributeElementCallback, numberCb: AttributeElementCallback) {
    if (FORCE_SELECT_SINGLE && isSelectType(type) && att.attributeEntryId)
        return selectCb();
    else if (!FORCE_SELECT_SINGLE && isSelectMultiType(type) && att.attributeEntryIds)
        return mutilSelctCb();
    else if (type === AttType.Checkmark && att.attributeEntryId)
        return checkmarkCb();
    else if (type === AttType.InputDate && att.inputDate) {
        console.log("att.inputDate = ", att.inputDate);
        return dateCb();
    }    
    else if ((type === AttType.InputText || type === AttType.InputTextSuggest) && att.inputText)
        return textCb();
    else if ((type === AttType.InputInt || type === AttType.InputDecimal) && att.inputNumber && att.inputNumber > 0)
        return numberCb();
    return null;
}

export function resolveSearchAttribute(id: string | number, att: IXBaseAttribute, usedInputMaps: Array<[TAttributeState, TAttributeSetState]>, isSearch: boolean) {
    if (FORCE_SELECT_SINGLE && isSelectType(att.type)) {
        return resolveAttributeSelect(id, att, usedInputMaps[ENTRY_ID]);
    } else if (!FORCE_SELECT_SINGLE && isSelectMultiType(att.type)) {
        return resolveAttributeSelectMulti(id, att, usedInputMaps[ENTRY_IDS]);
    } else if (att.type === AttType.Checkmark) {
        return resolveAttributeCheckMark(id, att, usedInputMaps[ENTRY_ID]);
    } else if (att.type === AttType.InputDate) {
        return resolveAttributeInputDate(id, att, usedInputMaps[INPUT_DATE], isSearch);
    } else if (att.type === AttType.InputText || att.type === AttType.InputTextSuggest) {
        return resolveAttributeInputText(id, att, usedInputMaps[INPUT_TEXT]);
    } else if (att.type === AttType.InputInt || att.type === AttType.InputDecimal) {
        return resolveAttributeInputNumber(id, att, usedInputMaps[INPUT_NUMBER], isSearch);
    }
}

export function resolveSearchAttributeController(id: string | number, att: IXBaseAttribute, usedInputMaps: Array<[TAttributeState, TAttributeSetState]>, isSearch: boolean) {
    if (FORCE_SELECT_SINGLE && isSelectType(att.type)) {
        return resolveAttributeSelectController(id, att, usedInputMaps[ENTRY_ID]);
    } else if (!FORCE_SELECT_SINGLE && isSelectMultiType(att.type)) {
        return resolveAttributeSelectMultiController(id, att, usedInputMaps[ENTRY_IDS]);
    } else if (att.type === AttType.Checkmark) {
        return resolveAttributeCheckMarkController(id, att, usedInputMaps[ENTRY_ID]);
    } else if (att.type === AttType.InputDate) {
        return resolveAttributeInputDateController(id, att, usedInputMaps[INPUT_DATE], isSearch);
    } else if (att.type === AttType.InputText || att.type === AttType.InputTextSuggest) {
        return resolveAttributeInputTextController(id, att, usedInputMaps[INPUT_TEXT]);
    } else if (att.type === AttType.InputInt || att.type === AttType.InputDecimal) {
        return resolveAttributeInputNumberController(id, att, usedInputMaps[INPUT_NUMBER], isSearch);
    }
}

export function resolveIsAttributeButtonHasData(att: IXBaseAttribute, usedInputMaps: Array<[TAttributeState, TAttributeSetState]>) {
    if (att) {
        let attId = att.id;
        let mapId = getFilterAttributeMapId(att.type);
        let inputAtt = usedInputMaps[mapId][0].get(attId);
        let get = attributeGetSets[mapId] && attributeGetSets[mapId].get;
        let getFrom = attributeFromGetSets[mapId] && attributeFromGetSets[mapId].get;
        let getTo = attributeToGetSets[mapId] && attributeToGetSets[mapId].get;
        let result = get(inputAtt) || getFrom && getFrom(inputAtt) || getTo && getTo(inputAtt);
        if (att.id === 1) {
            fLog(TAG, 'resolveIsAttributeButtonHasData', result)
        }
        return result;
    } else {
        return false;
    }
}

export function resolveIsAttributeHasData(att: IXBaseAttribute, usedStateInputMap: TAttributeState) {
    fLog(TAG, `popCurrentFilterInput resolveIsAttributeHasData att = `, att, "usedStateInputMap = ", usedStateInputMap)
    if (att) {
        let attId = att.id;
        let mapId = getFilterAttributeMapId(att.type);
        let inputAtt = usedStateInputMap.get(attId);
        let get = attributeGetSets[mapId] && attributeGetSets[mapId].get;
        let getFrom = attributeFromGetSets[mapId] && attributeFromGetSets[mapId].get;
        let getTo = attributeToGetSets[mapId] && attributeToGetSets[mapId].get;
        let result = get(inputAtt) || getFrom && getFrom(inputAtt) || getTo && getTo(inputAtt);
        if (att.id === 1) {
            fLog(TAG, 'resolveIsAttributeButtonHasData', result)
        }
        return result;
    } else {
        return false;
    }
}

export function resolveIsAttributeButtonCaption(att: IXBaseAttribute, usedInputMaps: Array<[TAttributeState, TAttributeSetState]>) {
    if (att) {
        let attId = att.id;
        let mapId = getFilterAttributeMapId(att.type);
        let inputAtt = usedInputMaps[mapId][0].get(attId);
        let get = attributeGetSets[mapId] && attributeGetSets[mapId].get;
        let getFrom = attributeFromGetSets[mapId] && attributeFromGetSets[mapId].get;
        let getTo = attributeToGetSets[mapId] && attributeToGetSets[mapId].get;

        let result = att.name;

        if (FORCE_SELECT_SINGLE && isSelectType(att.type)) {
            let entryId = get(inputAtt)
            if (entryId)
                result = att.entries.find(item => item.id == entryId).name;
        } else if (!FORCE_SELECT_SINGLE && isSelectMultiType(att.type)) {
            result = 'To be Implemented';
        } else if (att.type === AttType.Checkmark) {
            let entryId = get(inputAtt)
            return entryId ? `${att.name}:apps.yes` : att.name;
        } else if (att.type === AttType.InputDate) {
            let from = getFrom(inputAtt);
            let to = getTo(inputAtt);
            if (from && !to)
                result = `apps.from ${from}`
            else if (!from && to)
                result = `apps.to ${to}`
            else if (from & to)
                result = `${from}-${to}`
            return result;
        } else if (att.type === AttType.InputText || att.type === AttType.InputTextSuggest) {
            let value = get(inputAtt)
            if (value)
                result = value
        } else if (att.type === AttType.InputInt || att.type === AttType.InputDecimal) {
            let from = getFrom(inputAtt);
            let to = getTo(inputAtt);
            if (from && !to)
                result = `apps.from ${from}`
            else if (!from && to)
                result = `apps.to ${to}`
            else if (from && to)
                result = `${from}-${to}`
            if (result !== att.name && att.unit)
                result += ` ${att.unit}`
        }
        return result;
    } else {
        return "";
    }
}

export function resolveAttributeButtonReset(att: { id: number, type: number }, usedInputMaps: Array<[TAttributeState, TAttributeSetState]>) {
    fLog(TAG, 'resolveAttributeButtonReset', att)
    if (att) {
        let attId = att.id;
        let mapId = getFilterAttributeMapId(att.type);
        let set = attributeGetSets[mapId] && attributeGetSets[mapId].set;
        let setFrom = attributeFromGetSets[mapId] && attributeFromGetSets[mapId].set;
        let setTo = attributeToGetSets[mapId] && attributeToGetSets[mapId].set;
        fLog(TAG, 'resolveAttributeButtonReset', mapId, usedInputMaps[mapId])
        const [inputMap, setInputMap] = usedInputMaps[mapId];
        var newInputMap = new Map(inputMap);
        set(newInputMap.get(attId), null, att);
        if (setFrom)
            setFrom(newInputMap.get(attId), null, att);
        if (setTo)
            setTo(newInputMap.get(attId), null, att);
        setInputMap(newInputMap);
    }
}

export function resolveAttributeSelect(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState]): JSX.Element {
    return <AttributeSelect id={id} att={att} usedInputMap={usedInputMap} getSets={attributeGetSets[ENTRY_ID]}></AttributeSelect>
}

export function resolveAttributeSelectMulti(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState]): JSX.Element {
    return <AttributeSelectMulti id={id} att={att} usedInputMap={usedInputMap} getSets={attributeGetSets[ENTRY_IDS]}></AttributeSelectMulti>
}

export function resolveAttributeCheckMark(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState]): JSX.Element {
    return <AttributeCheckMark id={id} att={att} usedInputMap={usedInputMap} getSets={attributeGetSets[ENTRY_ID]}></AttributeCheckMark>
}

export function resolveAttributeInputText(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState]): JSX.Element {
    return <AttributeInputText id={id} att={att} usedInputMap={usedInputMap} getSets={attributeGetSets[INPUT_TEXT]}></AttributeInputText>
}

export function resolveAttributeInputDate(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], isFromTo: boolean): JSX.Element {
    if (isFromTo)
        return getFromToLayout(id,
            singleAttributeInputDate(id + "-from", att, usedInputMap, attributeFromGetSets[INPUT_DATE]),
            singleAttributeInputDate(id + "-to", att, usedInputMap, attributeToGetSets[INPUT_DATE]))
    else {
        return singleAttributeInputDate(id, att, usedInputMap, attributeGetSets[INPUT_DATE]);
    }
}

function singleAttributeInputDate(id: number | string, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], getSets: IGetSet): JSX.Element {
    return <AttributeInputDate id={id} att={att} usedInputMap={usedInputMap} getSets={getSets}></AttributeInputDate>
}

export function resolveAttributeInputNumber(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], isFromTo: boolean): JSX.Element {
    if (isFromTo)
        return getFromToLayout(id,
            singleAttributeInputNumber(id + "-from", att, usedInputMap, attributeFromGetSets[INPUT_NUMBER]),
            singleAttributeInputNumber(id + "-to", att, usedInputMap, attributeToGetSets[INPUT_NUMBER]))
    else {
        return singleAttributeInputNumber(id, att, usedInputMap, attributeGetSets[INPUT_NUMBER]);
    }
}

function singleAttributeInputNumber(id: number | string, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], getSets: IGetSet): JSX.Element {
    return <AttributeInputNumber id={id} att={att} usedInputMap={usedInputMap} getSets={getSets}></AttributeInputNumber>
}

////
export function resolveAttributeSelectController(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState]): JSX.Element {
    return <AttributeSelectController id={id} att={att} usedInputMap={usedInputMap} getSets={attributeGetSets[ENTRY_ID]}></AttributeSelectController>
}

export function resolveAttributeSelectMultiController(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState]): JSX.Element {
    return <AttributeSelectMultiController id={id} att={att} usedInputMap={usedInputMap} getSets={attributeGetSets[ENTRY_IDS]}></AttributeSelectMultiController>
}

export function resolveAttributeCheckMarkController(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState]): JSX.Element {
    return <AttributeCheckMarkController id={id} att={att} usedInputMap={usedInputMap} getSets={attributeGetSets[ENTRY_ID]}></AttributeCheckMarkController>
}

export function resolveAttributeInputTextController(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState]): JSX.Element {
    return <AttributeInputTextController id={id} att={att} usedInputMap={usedInputMap} getSets={attributeGetSets[INPUT_TEXT]}></AttributeInputTextController>
}

export function resolveAttributeInputDateController(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], isFromTo: boolean): JSX.Element {
    if (isFromTo)
        return getFromToControllerLayout(id,
            singleAttributeInputDateController(id + "-from", att, usedInputMap, attributeFromGetSets[INPUT_DATE]),
            singleAttributeInputDateController(id + "-to", att, usedInputMap, attributeToGetSets[INPUT_DATE]))
    else {
        return singleAttributeInputDateController(id, att, usedInputMap, attributeGetSets[INPUT_DATE]);
    }
}

function singleAttributeInputDateController(id: number | string, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], getSets: IGetSet): JSX.Element {
    return <AttributeInputDateController id={id} att={att} usedInputMap={usedInputMap} getSets={getSets}></AttributeInputDateController>
}

export function resolveAttributeInputNumberController(id: string | number, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], isFromTo: boolean): JSX.Element {
    if (isFromTo)
        return getFromToControllerLayout(id,
            singleAttributeInputNumberController(id + "-from", att, usedInputMap, attributeFromGetSets[INPUT_NUMBER]),
            singleAttributeInputNumberController(id + "-to", att, usedInputMap, attributeToGetSets[INPUT_NUMBER]))
    else {
        return singleAttributeInputNumberController(id, att, usedInputMap, attributeGetSets[INPUT_NUMBER]);
    }
}

function singleAttributeInputNumberController(id: number | string, att: IXBaseAttribute, usedInputMap: [TAttributeState, TAttributeSetState], getSets: IGetSet): JSX.Element {
    return <AttributeInputNumberController id={id} att={att} usedInputMap={usedInputMap} getSets={getSets}></AttributeInputNumberController>
}
////
function getFromToLayout(id: number | string, from: JSX.Element, to: JSX.Element): JSX.Element {
    // const texts = useSelector(state => state.localization.texts);
    return <View style={FilterStyles.filter_item_duo}>
        <Text style={FilterStyles.filter_item_value_all_for_duo_items}>{"apps.all"}</Text>
        <Text id="from">{from}</Text>
        <Text id="to">{to}</Text>
    </View>
}
function getFromToControllerLayout(id: number | string, from: JSX.Element, to: JSX.Element): JSX.Element {
    return <View id="from-to-attribute-container">
        <View id="from">{from}</View>
        <View id="from-to-separator"></View>
        <View id="to">{to}</View>
    </View>
}