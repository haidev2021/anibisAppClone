
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, ActivityIndicator, Modal,
} from 'react-native';
import globalVar, { trans } from '../../utils/common';
import { Styles } from './styles';
import CenterAnchoredModal from '../../sharedcomponents/centerAnchoredModal/centerAnchoredModal';
import { IXBaseCategory, IHistoryCategory } from '../../utils/xbaseInterface.d';
import { CategorySearchCountItem } from './categoryItem';
import { CategorySectionTitle } from './categorySectionTitle';
import { useSelector } from 'react-redux';


export interface ICategoryModal {
    id: string, 
    isOpen: boolean;
    onXClick: () => void;
    historiedCats?: Array<IXBaseCategory>;
    parentCats: Array<IXBaseCategory>;
    subCats: Array<IXBaseCategory>;
    onBottomButtonClick: () => void;
    searchCounts?: Map<number, number>;
    onHistoriedCategoryClick?: (cat: IXBaseCategory) => void;
    onRootCategoryClick: () => void;
    onSubCategoryClick: (cat: IXBaseCategory) => void;
    bottomButtonText?: string;
    hideBottomButton: boolean;
    onHistoryDeleteClick?: () => void;
}

export default function CategoryModal(props: ICategoryModal) {
    const { id, isOpen, onXClick, historiedCats, parentCats, subCats, onBottomButtonClick, searchCounts, onHistoriedCategoryClick, onRootCategoryClick, onSubCategoryClick, bottomButtonText, hideBottomButton, onHistoryDeleteClick } = props;

    const texts = useSelector(state => state.localization.texts)

    return <CenterAnchoredModal isOpen={isOpen} onXClick={onXClick} onBottomButtonClick={onBottomButtonClick}
        bottomButtonText={bottomButtonText} hideBottomButton={hideBottomButton} title={trans("apps.category", texts)}>
        <View style={Styles.category_list} >

            {/* <CategorySearchCountItem name={trans("apps.inallcategories", texts)} onPress={onRootCategoryClick}
                subTitle={undefined} isSelected={parentCats.length === 0} isParent={true} /> */}

            {[...historiedCats, null, ...parentCats, ...subCats].map((cat, index) => {
                let parentStart = historiedCats.length;
                let subStart = historiedCats.length + 1 + parentCats.length;
                let name = cat ? cat.name : trans("apps.inallcategories", texts);
                let onPress = index < historiedCats.length ?
                    () => onHistoriedCategoryClick(cat as IXBaseCategory) : (
                        cat ? () => onSubCategoryClick(cat) : onRootCategoryClick);
                let isHistory = index < historiedCats.length;
                let isSelected = index === subStart - 1;
                let isParent = index >= parentStart && index < subStart;
                let searchCount = cat ?
                    searchCounts && searchCounts.get((cat as IXBaseCategory).id) :
                    searchCounts && searchCounts.get(0);
                let subTitle = index < historiedCats.length ?
                    (cat as IHistoryCategory).path :
                    (searchCount == undefined ? "" : "" + searchCount)
                let hasTitle = historiedCats.length > 0 && (index == 0 || index == parentStart);
                let title = index == 0 && historiedCats.length > 0 ? trans("apps.categories.last", texts) : trans("apps.categories", texts);
                let titleAction = index == 0 && historiedCats.length > 0 ? trans("apps.action.deletelastcategoriesvisited", texts) : "";
                let catItemKey = "" + (isHistory ? "history" + (cat as IXBaseCategory).id : (cat ? cat.id : 0));
                return <Fragment>
                    {hasTitle && <CategorySectionTitle key={title} name={title} actionText={titleAction} onActionPress={onHistoryDeleteClick}></CategorySectionTitle>}
                    <CategorySearchCountItem key={catItemKey} name={name} onPress={onPress}
                        style={(isParent || isHistory) ? Styles.parent_category : Styles.sub_category}
                        subTitle={subTitle} isSelected={isSelected} isParent={isParent} isHistory={isHistory} />
                </Fragment>
            })}
        </View>
    </CenterAnchoredModal>
}