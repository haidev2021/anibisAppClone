import { View, TouchableOpacity, Text } from "react-native";
import { FilterStyles } from "../filter/filterStyles";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { trans } from "../../utils/common";
import { useSelector } from "react-redux";
import CenterAnchoredModal from "../../sharedcomponents/centerAnchoredModal/centerAnchoredModal";
import { FocusableInput } from "../../sharedcomponents/focusableInput/focusableInput";
import { InsertionLocationModal } from "./insertionLocattionModal";
import { TTextPack } from "../../utils/xbaseInterface.d";
import { LocationSearch } from "../filter/locationSearch";
import { LocationSearchController } from "../filter/locationSearchController";
import MandatoryAlertMark from "../../sharedcomponents/mandatoryAlert/mandatoryAlertMark";

interface IInsertionTitle {
    label: string;
    street: string;
    onStreetChange: (value: string) => void;
    country: string;
    onCountryChange: (value: string) => void;
    city: string;
    onCityChange: (value: string) => void;
    zip: string;
    onZipChange: (value: string) => void;
    isValidating: boolean;
    onError: (error: string) => void;
}
export function InsertionLocation(props: IInsertionTitle): JSX.Element {
    const { label, street, onStreetChange, country, onCountryChange, city, onCityChange, zip, onZipChange, isValidating, onError } = props;
    const [showLocationModal, setShowLocationModal] = useState(false);
    const texts = useSelector(state => state.localization.texts);

    const onXClick = useCallback(() => {
        setShowLocationModal(false)
    }, [])

    const onLocationPress = useCallback(() => {
        setShowLocationModal(true)
    }, [])

    const areaCaption = useMemo(() => {
        return zip || city ? `${country}-${zip} ${city}` : ``;
    }, [zip, city, country])

    useEffect(() => {
        onError(isValidating && (!city || !zip) ? trans("apps.insertion.errordatastatefailadverthasnocontactaddress", texts): "")
    }, [isValidating, city, zip])

    return <View style={FilterStyles.filter_group}>
        <TouchableOpacity style={FilterStyles.filter_item} onPress={onLocationPress}>

            <Text style={FilterStyles.filter_item_key}>{label}</Text>

            <Text style={FilterStyles.filter_item_value}>{areaCaption}</Text>
            {!!street && <Text style={FilterStyles.filter_item_value}>{street}</Text>}


            {isValidating && (!city || !zip) && <MandatoryAlertMark text={trans("apps.insertion.errordatastatefailadverthasnocontactaddress", texts)}></MandatoryAlertMark>}
        </TouchableOpacity>
        <InsertionLocationModal isOpen={showLocationModal} onXClick={onXClick}
            title={label} street={street} country={country} onCountryChange={onCountryChange} onStreetChange={onStreetChange}
            city={city} zip={zip} onZipChange={onZipChange} onCityChange={onCityChange}
        ></InsertionLocationModal>
    </View>
}