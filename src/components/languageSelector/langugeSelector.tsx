import React from 'react';
import { trans } from '../../utils/common';
import { TTextPack } from '../../utils/xbaseInterface.d';
import { STSStyles } from './lsStyle';
import EntrySelectorModal from '../attributeSelector/entrySelectorModal';
export interface ILanguageSelector {
    value: string;
    onChange: (params: string | number | undefined) => void;
    texts: TTextPack;
    isOpen: boolean;
    onXClick: () => void;
}
export function LanguageSelector(props: ILanguageSelector) {
    const { value, onChange, texts, isOpen, onXClick } = props;
    const data = [
        { value: "de", label: trans("apps.chooselng.de", texts) },
        { value: "fr", label: trans("apps.chooselng.fr", texts) },
        { value: "it", label: trans("apps.chooselng.it", texts) }
    ];

    return <EntrySelectorModal
        entries={data}
        onValueChange={onChange}
        value={value}
        isOpen={isOpen}
        onXClick={onXClick}
        title={trans("apps.chooselng", texts)}/>
}