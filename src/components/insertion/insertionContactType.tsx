import { View, TouchableOpacity, Text } from "react-native";
import { FilterStyles } from "../filter/filterStyles";
import React, { useState, useCallback } from "react";
import { trans } from "../../utils/common";
import { useSelector } from "react-redux";
import CenterAnchoredModal from "../../sharedcomponents/centerAnchoredModal/centerAnchoredModal";
import { FocusableInput } from "../../sharedcomponents/focusableInput/focusableInput";
import { ContactTypeSelectorModal, CONTACT_TYPE_FORM_ONLY, CONTACT_TYPE_PHONE_ONLY, CONTACT_TYPE_FORM_AND_PHONE } from "./contactTypeSelectorModal";

interface IInsertionTitle {
    value: number;
    onValueChange: (value: number) => void;
}

export function InsertionContactType(props: IInsertionTitle): JSX.Element {
    const { value, onValueChange } = props;
    const [showModal, setShowModal] = useState(false);
    const texts = useSelector(state => state.localization.texts);

    const onModalXPress = useCallback(() => {
        setShowModal(false)
    }, [])

    const onKeyPress = useCallback(() => {
        setShowModal(true)
    }, [])

    const map = new Map([
        [CONTACT_TYPE_FORM_ONLY, trans("apps.contacttypeform", texts)],
        [CONTACT_TYPE_PHONE_ONLY, trans("apps.contacttypephone", texts)],
        [CONTACT_TYPE_FORM_AND_PHONE, trans("apps.contacttypeboth", texts)]]);
        
    return <View style={FilterStyles.filter_group}>
        <TouchableOpacity style={FilterStyles.filter_item} onPress={onKeyPress}>

            <Text style={FilterStyles.filter_item_key}>{trans("apps.contacttype", texts)}</Text>
            
            <Text style={FilterStyles.filter_item_value}>{map.get(value)}</Text>
        </TouchableOpacity>

        <ContactTypeSelectorModal
            value={value}
            onChange={onValueChange}
            texts={texts}
            isOpen={showModal}
            onXClick={onModalXPress}></ContactTypeSelectorModal>
    </View>
}