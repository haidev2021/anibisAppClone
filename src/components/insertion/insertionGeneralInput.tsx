import { View, TouchableOpacity, Text } from "react-native";
import { FilterStyles } from "../filter/filterStyles";
import React, { useState, useCallback, useEffect } from "react";
import { trans } from "../../utils/common";
import { useSelector } from "react-redux";
import CenterAnchoredModal from "../../sharedcomponents/centerAnchoredModal/centerAnchoredModal";
import { FocusableInput } from "../../sharedcomponents/focusableInput/focusableInput";
import MandatoryAlertMark from "../../sharedcomponents/mandatoryAlert/mandatoryAlertMark";

interface IInsertionTitle {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    isValidating: boolean;
    error: string;
    onError: (error: string) => void;
}

export function InsertionGeneralInput(props: IInsertionTitle): JSX.Element {
    const {label, value, onValueChange, isValidating, error, onError} = props;
    const [showModal, setShowModal] = useState(false);
    const texts = useSelector(state => state.localization.texts);

    const onXClick = useCallback(() => {
        setShowModal(false)
    }, [])

    const onTitlePress = useCallback(() => {
        setShowModal(true)
    }, [])

    useEffect(() => {
        onError(isValidating && !value ? error : "")
    }, [isValidating, value])

    return <View style={FilterStyles.filter_group}>
        <TouchableOpacity style={FilterStyles.filter_item} onPress={onTitlePress}>

            <Text style={FilterStyles.filter_item_key}>{label}</Text>
    
            <Text style={FilterStyles.filter_item_value}>{value}</Text>

            {isValidating && !value && <MandatoryAlertMark text={error}></MandatoryAlertMark>}

        </TouchableOpacity>

        <CenterAnchoredModal isOpen={showModal} onXClick={onXClick} title={label}>
            <View style={{ padding: 20, paddingTop: 40 }}>
                <FocusableInput value={value} onValueChange={onValueChange} label={label}></FocusableInput></View>
        </CenterAnchoredModal>
    </View>
}