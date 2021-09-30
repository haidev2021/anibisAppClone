import React from 'react';
import { trans } from '../../utils/common';
import { TTextPack } from '../../utils/xbaseInterface.d';
import { STSStyles } from './stsStyle';
import EntrySelectorModal from '../attributeSelector/entrySelectorModal';
export interface ISortTypeSelectorModal {
    value: string;
    onChange: (params: any) => void;
    texts: TTextPack;
    isElevantAvailable: boolean;
    isOpen: boolean;
    onXClick: () => void;
}
export function SortTypeSelectorModal(props: ISortTypeSelectorModal) {
    const { value, onChange, texts, isElevantAvailable, isOpen, onXClick } = props;
    const data = [
        { value: "pri|a", label: trans("apps.sort.pri.asc", texts) },
        { value: "pri|d", label: trans("apps.sort.pri.desc", texts) },
        { value: "dpo|d", label: trans("apps.sort.dpo.desc", texts) }
    ];
    if (isElevantAvailable)
        data.push({ value: "ftw|d", label: trans("apps.sort.ftw.asc", texts) });

    return <EntrySelectorModal
        entries={data}
        onValueChange={onChange}
        value={value}
        isOpen={isOpen}
        onXClick={onXClick}
        title={trans("apps.sorting", texts)}/>
}