

import React, { useState, useCallback, useEffect, useRef, Fragment } from "react";
import { IOnLocationSuggestSuccess, IOnError } from '../../redux/actions/action.d';
import { fetchLocationSuggestAction } from '../../redux/actions/actionsLocationSuggest';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { FocusableInput } from '../../sharedcomponents/focusableInput/focusableInput';
import { useDispatch, useSelector } from 'react-redux';
import { IXBaseAdvert } from '../../utils/xbaseInterface.d';
import { parseZipCity, trans } from '../../utils/common';
import { FilterStyles } from '../filter/filterStyles';
import { suggestionIcon } from '../../utils/assetHelper';
function toTitleCase(str: string) {
    return str.split(' ')
        .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(' ')
}

export interface ILocationInsert {
    editAddress: any;
    onChange: (zip: string, city: string) => void;
    countryCode: string;
}

export function LocationInsertZipCity(props: ILocationInsert): JSX.Element {
    const { editAddress, onChange, countryCode } = props;
    const [locationSuggestions, setLocationSuggestions] = useState(null);
    const [zip, setZip] = useState(null);
    const [city, setCity] = useState(null);
    const locationRef = useRef(null);
    const dispatch = useDispatch();
    const texts = useSelector(state => state.localization.texts);
    const isCityEditable = countryCode !== "vn" && countryCode !== "ch";

    useEffect(() => {
        if (editAddress != null) {
            setZip(editAddress.zip);
            setCity(editAddress.city);
        }
    }, [editAddress]);

    const onSuggestionClick = useCallback(loc => {
        let { zip, city } = parseZipCity(loc);
        console.log('LocationInsert zip ', zip, 'city', city)
        setZip(zip);
        setCity(city);
        onChange("" + zip, city);
        setLocationSuggestions(null);
    }, [onChange]);

    const onCityChange = useCallback(city => {
        setCity(city);
        if (isCityEditable)
            onChange("" + zip, city);
    }, [isCityEditable, zip]);

    const onZipChange = useCallback(value => {
        setZip(value);
        if (isCityEditable)
            onChange(value, "" + city);
        locationRef.current = value
        const requestTrigger = value;
        if (!requestTrigger) {
            setLocationSuggestions(null);
            onChange(null, null);
        } else {
            setTimeout(function () {
                if (locationRef.current === requestTrigger) {
                    let onSuccess: IOnLocationSuggestSuccess = function (data: string[]) {
                        console.log(`/fetchLocationSuggestAction IOnLocationSuggestSuccess data`, data)
                        setLocationSuggestions(data);
                    }
                    let onError: IOnError = function (error: string) {
                        console.log("POST '/fetchLocationSuggestAction' onError:", error);
                    }
                    let param = {
                        countryCode: countryCode,
                        prefix: requestTrigger,
                    };
                    dispatch(fetchLocationSuggestAction(param, onSuccess, onError))
                }
            }, 750);
        }
    }, [countryCode, onChange, zip, city, isCityEditable]);
    console.log('countryCode', countryCode)

    let suggestionsContainerStyle = StyleSheet.compose(
        FilterStyles.suggestions_container,
        { display: (locationSuggestions && locationSuggestions.length > 0) ? 'flex' : 'none' })

    return <Fragment>
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <View style={{ flex: 1, paddingRight: 5 }}>
                <FocusableInput value={zip} onValueChange={onZipChange} label={trans("apps.advertzipcode", texts)}></FocusableInput>
            </View>
            <View style={{ flex: 1, paddingLeft: 5 }}>
                <FocusableInput value={city} onValueChange={onCityChange} label={trans("apps.advertcity", texts)} editable={isCityEditable}></FocusableInput>
            </View>
        </View>

        <View
            style={suggestionsContainerStyle}>
            {locationSuggestions && locationSuggestions.map((item: string) => {
                return <TouchableOpacity style={FilterStyles.suggestion_touch} onPress={() => onSuggestionClick(item)}>
                    <Image style={FilterStyles.suggestion_icon} source={suggestionIcon}></Image>
                    <Text style={FilterStyles.suggestion_gray}>
                        {item.substring(0, zip ? zip.length : 0)}
                        <Text style={FilterStyles.suggestion_black} data-click={item} >
                            {item.substring(zip ? zip.length : 0, item.length)}
                        </Text>
                    </Text>
                </TouchableOpacity>
            })}
        </View>
    </Fragment>
}