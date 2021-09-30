import React, { useState, useEffect } from 'react';
import { trans } from '../../utils/common';
import { TTextPack, IXBaseCountry } from '../../utils/xbaseInterface.d';
import EntrySelectorModal from '../attributeSelector/entrySelectorModal';
export const CONTACT_TYPE_FORM_ONLY = 0;
export const CONTACT_TYPE_PHONE_ONLY = 1;
export const CONTACT_TYPE_FORM_AND_PHONE = 3;

export interface ICountrySelectorModal {
    value: string;
    onChange: (params: any) => void;
    texts: TTextPack;
    isOpen: boolean;
    onXClick: () => void;
    data: Array<any>;
}
export function CountrySelectorModal(props: ICountrySelectorModal) {
    const { value, onChange, texts, isOpen, onXClick, data} = props;
    // const [data, setData] = useState([]);
    // const TAG = "countries";

    return <EntrySelectorModal
        entries={data}
        onValueChange={onChange}
        value={value}
        isOpen={isOpen}
        onXClick={onXClick}
        title={trans("apps.advertcountry", texts)} />
}