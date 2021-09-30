import React from 'react';
import { trans } from '../../utils/common';
import { TTextPack } from '../../utils/xbaseInterface.d';
import { STSStyles } from './stsStyle';
import EntrySelectorModal from '../attributeSelector/entrySelectorModal';
export const CONTACT_TYPE_FORM_ONLY = 0;
export const CONTACT_TYPE_PHONE_ONLY = 1;
export const CONTACT_TYPE_FORM_AND_PHONE = 3;

export interface ISortTypeSelectorModal {
    value: string;
    onChange: (params: any) => void;
    texts: TTextPack;
    isOpen: boolean;
    onXClick: () => void;
}
export function ContactTypeSelectorModal(props: ISortTypeSelectorModal) {
    const { value, onChange, texts, isOpen, onXClick } = props;
    const data = [
        { value: CONTACT_TYPE_FORM_ONLY, label: trans("apps.contacttypeform", texts) },
        { value: CONTACT_TYPE_PHONE_ONLY, label: trans("apps.contacttypephone", texts) },
        { value: CONTACT_TYPE_FORM_AND_PHONE, label: trans("apps.contacttypeboth", texts) }
    ];

    return <EntrySelectorModal
        entries={data}
        onValueChange={onChange}
        value={value}
        isOpen={isOpen}
        onXClick={onXClick}
        title={trans("apps.contacttype", texts)}/>
}