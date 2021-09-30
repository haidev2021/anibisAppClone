// import { Route, Switch, NavLink, Link } from 'react-router-dom'
import React, { Component, useState, useEffect, useLayoutEffect, useRef, useCallback, Fragment, useContext, Dispatch, SetStateAction } from 'react';
// import Axios from 'axios';
// import { getInputClassName } from '../insert/helper/insertHelper';
import { XBASE_LOCATION_SUGGESTION_API } from '../../utils/network';
// import { ValidationContext } from '../../screens/insert/insert';
// import { RootContext } from '../../root';
import { trans } from '../../utils/common';
import { IRootContext, accentColor } from '../../utils/xbaseInterface.d';
import { IOnLocationSuggestSuccess, IOnError, IFetchLocationSuggestParam } from '../../redux/actions/action.d';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocationSuggestAction } from '../../redux/actions/actionsLocationSuggest';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { FilterStyles } from './filterStyles';

export interface ILocationSearch {
    onChange: Dispatch<SetStateAction<string>>;
    value: string;
    isSearch: boolean;
    onFilterItemPress? : (id: string) => void
}
export function LocationSearch(props: ILocationSearch) {
    const { onChange, value, isSearch, onFilterItemPress } = props;
    const validationContext = { isValidating: false };//useContext(ValidationContext);
    const rootContext = { language: "de", commonTexts: null };//: IRootContext = useContext(RootContext);
    const [locationSuggestions, setLocationSuggestions] = useState<Array<string> | null>(null);
    const [location, setLocation] = useState(null);
    const locationRef = useRef(null);
    const dispatch = useDispatch();
    const texts = useSelector(state => state.localization.texts);

    useEffect(() => {
        setLocation(value);
    }, [value])

    let label = <Text htmlFor="contact-type">{trans("apps.location", texts)}</Text>;
    // let TextInputClassName = isSearch ? "large" : getInputClassName(!location ? value : location, validationContext.isValidating, true);

    const result = location ? location : trans("apps.all", texts)
    const style = location ? FilterStyles.filter_item_value : FilterStyles.filter_item_value_all
    // if (isSearch)
    return <TouchableOpacity style={FilterStyles.filter_item} onPress={() => onFilterItemPress("city")}>
        <Text style={FilterStyles.filter_item_key}>{label}</Text>
        {/* <TextInput className="TextInputClassName" value={location} onValueChange={onLocationChange} autoComplete="off"></TextInput> */}
        <Text style={style}>{result}</Text>
    </TouchableOpacity>
}