
import React from 'react';

import globalVar, { trans } from '../../../utils/common';
import { Styles } from '../../categoryModal/styles';
import CenterAnchoredModal from '../../../sharedcomponents/centerAnchoredModal/centerAnchoredModal';
import { IXBaseCategory, IHistoryCategory, IXBaseAttribute, TAttributeState, TAttributeSetState } from '../../../utils/xbaseInterface.d';
import { CategorySearchCountItem } from '../../categoryModal/categoryItem';
import { CategorySectionTitle } from '../../categoryModal/categorySectionTitle';
import AttributeControllerList from './attributeControllerList';
import { useSelector } from 'react-redux';

export interface IAttributeControllerModal {
    isOpen: boolean;
    onXClick: () => void;
    onBottomButtonClick: () => void;
    xBaseAttributes: Array<IXBaseAttribute>;
    usedInputMaps: Array<[TAttributeState, TAttributeSetState]>;
    singleFilterItemId: number | string;
    isSearch: boolean;
    zipCityControllerView: JSX.Element | null;
}

export default function AttributeControllerModal(props: IAttributeControllerModal) {
    const texts = useSelector(state => state.localization.texts);
    const { isOpen, onXClick, onBottomButtonClick, xBaseAttributes, usedInputMaps, singleFilterItemId, isSearch, zipCityControllerView } = props;
    const title = singleFilterItemId == 'city' ? trans("apps.location", texts) :
        xBaseAttributes.find(item => item.id == singleFilterItemId)?.name;
    return <CenterAnchoredModal onXClick={onXClick} isOpen={isOpen} onBottomButtonClick={onBottomButtonClick} title={title}>
        <AttributeControllerList xBaseAttributes={xBaseAttributes} usedInputMaps={usedInputMaps}
            singleFilterItemId={singleFilterItemId} isSearch={isSearch}>
            {zipCityControllerView}
        </AttributeControllerList>
    </CenterAnchoredModal>
}