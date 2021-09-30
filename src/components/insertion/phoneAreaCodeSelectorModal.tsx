import React from 'react';
import { trans } from '../../utils/common';
import { TTextPack } from '../../utils/xbaseInterface.d';
import EntrySelectorModal from '../attributeSelector/entrySelectorModal';

export interface IPhoneAreaCodeSelectorModal {
    value: string;
    onChange: (params: any) => void;
    texts: TTextPack;
    isOpen: boolean;
    onXClick: () => void;
}
export function PhoneAreaCodeSelectorModal(props: IPhoneAreaCodeSelectorModal) {
    const { value, onChange, texts, isOpen, onXClick } = props;
    const data = [
        { value: "+41", label: "+41" },
        { value: "+49", label: "+49" },
        { value: "+33", label: "+33" },
        { value: "+43", label: "+43" },
        { value: "+423", label: "+423" },
        { value: "+39", label: "+39" },
    ];

    return <EntrySelectorModal
        entries={data}
        onValueChange={onChange}
        value={value}
        isOpen={isOpen}
        onXClick={onXClick}
        title={trans("apps.insertion.contact.countrycode", texts)}/>
}