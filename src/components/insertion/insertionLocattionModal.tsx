import { View, TouchableOpacity, Text } from "react-native";
import { FilterStyles } from "../filter/filterStyles";
import React, { useState, useCallback, useEffect } from "react";
import { trans } from "../../utils/common";
import { useSelector } from "react-redux";
import CenterAnchoredModal from "../../sharedcomponents/centerAnchoredModal/centerAnchoredModal";
import { FocusableInput } from "../../sharedcomponents/focusableInput/focusableInput";
import { CountrySelectorModal } from "./countrySelectorModal";
import { getXBaseCountries } from "../../utils/xbase/model/country";
import { IXBaseCountry } from "../../utils/xbaseInterface.d";
import { fLog } from "../../utils/utils";
import { LocationInsertZipCity } from "./locationInsertZipCity";

interface IInsertionTitle {
    isOpen: boolean,
    title: string;
    street: string;
    onStreetChange: (value: string) => void;
    country: string;
    onCountryChange: (value: string) => void;
    onXClick: () => void
    city: string;
    onCityChange: (value: string) => void;
    zip: string;
    onZipChange: (value: string) => void;
}
export function InsertionLocationModal(props: IInsertionTitle): JSX.Element {
    const { isOpen, title, street, onStreetChange, country, onCountryChange, onXClick, city, onCityChange, zip, onZipChange, } = props;
    const [showCountrySelectorModal, setShowCountrySelectorModal] = useState(false);
    const [countryMap, setCountryMap] = useState(new Map());
    const [countryArray, setCountryArray] = useState([]);
    const lng = useSelector(state => state.localization.language);
    const texts = useSelector(state => state.localization.texts);

    const onCountrySelectorXClick = useCallback(() => {
        setShowCountrySelectorModal(false)
    }, [])

    const onCountryPress = useCallback(() => {
        setShowCountrySelectorModal(true)
    }, [])

    useEffect(() => {
        let mounted = true
        if (isOpen && mounted)
            getXBaseCountries({ lng }, (countries: IXBaseCountry[]) => {
                let countryArray: any = [];
                let countryMap = new Map();
                countries.map(country => {
                    const value = country.shortCode;
                    const label = country.name;
                    countryArray.push({ value, label });
                    countryMap.set(value, label);
                    fLog("countries", 'countryArray = ', countryArray);
                })
                setCountryMap(countryMap);
                setCountryArray(countryArray);
            })
            return function cleanup() {
                mounted = false
            }
    }, [isOpen])

    const onZipCityChange = useCallback((zip, city) => {
        onCityChange(city);
        onZipChange(zip);
    }, [])

    return <CenterAnchoredModal isOpen={isOpen} onXClick={onXClick} title={title}>
        <View style={{ padding: 20, paddingTop: 40 }}>
            <TouchableOpacity style={FilterStyles.filter_item} onPress={onCountryPress}>

                <Text style={FilterStyles.filter_item_key}>{trans("apps.advertcountry", texts)}</Text>

                <Text style={FilterStyles.filter_item_value}>{countryMap.get(country)}</Text>

            </TouchableOpacity>

            <CountrySelectorModal data={countryArray} texts={texts} isOpen={showCountrySelectorModal} onXClick={onCountrySelectorXClick} value={country} onChange={onCountryChange}></CountrySelectorModal>
            <LocationInsertZipCity editAddress={{ zip, city }} onChange={onZipCityChange} countryCode={country.toLowerCase()}></LocationInsertZipCity>
            <FocusableInput style={{ marginTop: 40 }} value={street} onValueChange={onStreetChange} label={trans("apps.advertstreet", texts) + trans("apps.general.inputoptional", texts)}></FocusableInput>
        </View>
    </CenterAnchoredModal>
}