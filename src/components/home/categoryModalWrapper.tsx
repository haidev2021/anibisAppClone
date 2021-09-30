import CategoryModal from "../categoryModal/categoryModal";
import React, { useState, useEffect, useCallback, SetStateAction, Dispatch } from 'react';

import { getSubCategories } from '../../utils/xbase/model/category';
import { IXBaseCategory, IHistoryCategory, ISearchCountItem } from "../../utils/xbaseInterface.d";
import { trans } from "../../utils/common";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IOnSearchCountsSuccess, IOnError, IFetchSearchCountsParam } from "../../redux/actions/action.d";
import { useDispatch } from "react-redux";
import { fetchSearchCountsAction } from "../../redux/actions/actionsSearchCount";
import { fLog } from "../../utils/utils";
import { resetSearchListAction } from "../../redux/actions/actionsSearchList";

export interface ICategoryModalWrapper {
    visible: boolean;
    onXClick: () => void;
    navigation: any;
}

export function CategoryModalWrapper(props: ICategoryModalWrapper) {
    const TAG = "CategoryModalWrapper"
    const { visible, onXClick, navigation } = props;
    const [selectedCat, setSelectedCat] = useState<IXBaseCategory | null>(null);
    const [historiedCats, setHistoriedCats] = useState<Array<IHistoryCategory>>([]);
    const [parentCats, setParentCats] = useState<Array<IXBaseCategory>>([]);
    const [subCats, setSubCats] = useState<Array<IXBaseCategory>>([]);
    const [searchCounts, setSearchCounts] = useState(new Map<number, number>());
    const dispatch = useDispatch();

    const deleteData = useCallback(async () => {
        try {
            const jsonValue = await AsyncStorage.removeItem('@cat_visited_key')
            setHistoriedCats([]);
        } catch (e) {
            // error reading value
        }
    }, []);
    const getData = useCallback(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@cat_visited_key')
            fLog(TAG, 'getData jsonValue = ', jsonValue);
            setHistoriedCats(jsonValue != null ? JSON.parse(jsonValue) : []);
        } catch (e) {
            // error reading value
        }
    }, []);
    const storeData = useCallback(async () => {
        function getPath() {
            let path = "";
            parentCats.map((cat, index) => {
                if (index < parentCats.length - 1) {
                    path += ((index > 0 ? " / " : "") + cat.name)
                }
            })
            fLog(TAG, 'storeData path = ', path);
            return path;
        }
        try {
            let pureCategory = parentCats[parentCats.length - 1];
            fLog(TAG, 'storeData parentCats = ', parentCats);
            fLog(TAG, 'storeData pureCategory = ', pureCategory);
            fLog(TAG, 'storeData selectedCat = ', selectedCat);
            if (!historiedCats.find(item => item.id === pureCategory.id)) {
                let value: IHistoryCategory = { ...pureCategory, path: getPath() }
                const jsonValue = JSON.stringify(historiedCats.length < 3 ? [value, ...historiedCats] : [value, historiedCats[0], historiedCats[1]])
                await AsyncStorage.setItem('@cat_visited_key', jsonValue)
            }
        } catch (e) {
            // saving error
        }
    }, [historiedCats, parentCats, selectedCat]);
    useEffect(() => {
        if (visible) {
            getSubCategories({ id: null, lng: 'de' }, (result: any) => {
                // fLog(TAG, result);
                setSelectedCat(null);
                setParentCats([]);
                setSubCats(result as IXBaseCategory[])
            });
            getData();
        }
    }, [visible])
    useEffect(() => {
        fLog(TAG, `useEffect selectedCat`, selectedCat)
        let onSuccess: IOnSearchCountsSuccess = function (data: ISearchCountItem[]) {
            fLog(TAG, `/fetchSearchCountsAction IOnSearchCountsSuccess data`, data)
            let searchCountArray: Array<ISearchCountItem> = data;
            let searchCountMap = new Map();
            searchCountArray.map((item: ISearchCountItem) => {
                searchCountMap.set(item.id, item.count);
            })
            setSearchCounts(searchCountMap);
        }
        let onError: IOnError = function (error: string) {
            fLog(TAG, "POST '/fetchSearchCountsAction' onError:", error);
        }
        let param: IFetchSearchCountsParam = {
            language: 'de',
            query: `cid=${selectedCat ? selectedCat.id : 0}`
        };
        dispatch(fetchSearchCountsAction(param, onSuccess, onError))
    }, [selectedCat]);

    const onBottomButtonClick = useCallback(() => {
        fLog(TAG, `onBottomButtonClick parentCats = `, parentCats)
        if (selectedCat)
            storeData();
        dispatch(resetSearchListAction())
        navigation.navigate('Search', {
            catId: selectedCat ? selectedCat.id : 0,
            searchTermFlag: false,
            searchQuery: ''
        });
        onXClick();
    }, [parentCats, selectedCat, navigation, onXClick])

    const onRootCategoryClick = useCallback(() => {
        fLog(TAG, "onRootCategoryClick")
        getSubCategories({ id: null, lng: 'de' }, (result: any) => {
            setSelectedCat(null);
            setParentCats([]);
            setSubCats(result as IXBaseCategory[])
        });
    }, [])
    const onSubCategoryClick = useCallback((cat: IXBaseCategory) => {
        fLog(TAG, "onSubCategoryClick cat.id = ", cat)
        getSubCategories({ id: cat.id, lng: 'de' }, (result: any) => {
            setSelectedCat(cat);
            setParentCats(parentCats => {
                if (!cat)
                    return [];
                else {
                    let found = parentCats.indexOf(cat);
                    if (found >= 0) {
                        return parentCats.slice(0, found + 1);
                    } else
                        return [...parentCats, cat];
                }
            });
            setSubCats(result as IXBaseCategory[])
        });
    }, [])
    fLog(TAG, 'render parentCats = ', parentCats);
    const onHistoriedCategoryClick = useCallback((cat: IXBaseCategory) => {
        dispatch(resetSearchListAction())
        navigation.navigate('Search', {
            catId: cat ? cat.id : 0,
            searchTermFlag: false,
            searchQuery: ''
        });
        onXClick();
    }, [navigation, onXClick])

    return <CategoryModal
        id=""
        isOpen={visible}
        onXClick={onXClick}
        historiedCats={historiedCats}
        parentCats={parentCats}
        subCats={subCats}
        onBottomButtonClick={onBottomButtonClick}
        searchCounts={searchCounts}
        onHistoriedCategoryClick={onHistoriedCategoryClick}
        onRootCategoryClick={onRootCategoryClick}
        onSubCategoryClick={onSubCategoryClick}
        bottomButtonText={selectedCat ? selectedCat.name : trans("apps.inallcategories", null)}
        hideBottomButton={false}
        onHistoryDeleteClick={deleteData}
    ></CategoryModal>
}