

import React, { useState, useCallback, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FilterStyles } from "../filter/filterStyles";
import { PhoneAreaCodeSelectorModal } from "./phoneAreaCodeSelectorModal";
import { TTextPack } from "../../utils/xbaseInterface.d";
import { trans } from "../../utils/common";
import CenterAnchoredModal from "../../sharedcomponents/centerAnchoredModal/centerAnchoredModal";
import { FocusableInput } from "../../sharedcomponents/focusableInput/focusableInput";
import MandatoryAlertMark from "../../sharedcomponents/mandatoryAlert/mandatoryAlertMark";
export interface IInsertionPhone {
    areaCode: string,
    phone: string,
    onAreaCodeChange: (code: string) => void;
    onPhoneChange: (phone: string) => void;
    texts: TTextPack
    style: any;
    isValidating: boolean;
    onError: (error: string) => void;
}
export function InsertionPhone(props: IInsertionPhone): JSX.Element {
    const { areaCode, phone, onAreaCodeChange, onPhoneChange, texts, style, isValidating, onError } = props;
    const [showAreaModal, setShowAreaModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    const onAreaModalXClick = useCallback(() => {
        setShowAreaModal(false);
    }, [])

    const onPhoneXClick = useCallback(() => {
        setShowPhoneModal(false);
    }, [])

    const onPhoneCodePress = useCallback(() => {
        setShowAreaModal(true)
    }, [])

    const onPhonePress = useCallback(() => {
        setShowPhoneModal(true)
    }, [])
    
    useEffect(() => {
        onError(isValidating && !phone && style.display=="flex" ? trans("apps.insertion.erroraddressphone", texts) : "")
    }, [isValidating, phone, style])

    return <View style={StyleSheet.compose(FilterStyles.filter_group_duo, style)}>
        <TouchableOpacity style={FilterStyles.filter_item} onPress={onPhoneCodePress}>

            <Text style={FilterStyles.filter_item_key}>{trans("apps.insertion.contact.countrycode", texts)}</Text>

            <Text style={FilterStyles.filter_item_value}>{areaCode}</Text>

        </TouchableOpacity>
        <PhoneAreaCodeSelectorModal onXClick={onAreaModalXClick} texts={texts} value={areaCode} onChange={onAreaCodeChange} isOpen={showAreaModal}></PhoneAreaCodeSelectorModal>
        <TouchableOpacity style={FilterStyles.filter_item} onPress={onPhonePress}>

            <Text style={FilterStyles.filter_item_key}>{trans("apps.advertphone", texts)}</Text>

            <Text style={FilterStyles.filter_item_value}>{phone}</Text>

            {isValidating && !phone && <MandatoryAlertMark text={trans("apps.insertion.erroraddressphone", texts)}></MandatoryAlertMark>}
        </TouchableOpacity>
        <CenterAnchoredModal isOpen={showPhoneModal} onXClick={onPhoneXClick} title={trans("apps.advertphone", texts)}>
            <View style={{ padding: 20, paddingTop: 40 }}>
                <FocusableInput value={phone} onValueChange={onPhoneChange} label={trans("apps.advertphone", texts)}></FocusableInput></View>
        </CenterAnchoredModal>
    </View>
}