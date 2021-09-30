
import React, { Component, useState, useEffect, useLayoutEffect, useRef, useCallback, Fragment, useContext, useMemo, MutableRefObject, SetStateAction, Dispatch } from 'react';

import { trans, parseZipCity, formatString, } from '../../utils/common';
import {
    ATTRIBUTE_ID_LIST, ATTRIBUTE_MULTIID_LIST, ATTRIBUTE_RANGE_LIST_DATE, ATTRIBUTE_RANGE_LIST_NUMBER,
    ATTRIBUTE_TEXT_LIST, CATEGORY_ID, encodeSubQuery, SEARCH_LOCATION, SEARCH_TERM, SORT_FIELD, SORT_ORDER, getCompoundQuery, updateSubQueryRef, TQuueryField
} from '../../utils/searchQueryHelper';
import { TextSearch } from '../../components/textSearch/textSearch';
import { ADVERT_SEARCH_RESULT_API, ADVERT_SEARCH_COUNT_API } from '../../utils/network';
import { Filter } from '../filter/filter';
import { SortTypeSelector, SortTypeSelectorModal } from '../sortTypeSelector/SortTypeSelectorModal';
import { TTextPack, ICommonFilter, ICategoryFilter, ILoginInfo, INoContent, IRootContext, TLanguage, IXBaseCountry, TTextPackId, ISearchCountItem } from '../../utils/xbaseInterface.d';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button, TouchableOpacity, Dimensions, ActivityIndicator
} from 'react-native';
import { AdvertList, ListType, ItemType } from '../advertLists/list';
import { FilterListStyles } from './filterListStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchListAdvertsAction, fetchSearchListIdsAction, resetSearchListAction } from '../../redux/actions/actionsSearchList';
import { IOnError, IOnSuccessNoContent, IOnSearchCountsSuccess, IFetchSearchCountsParam } from '../../redux/actions/action.d';
import { noContentImage, ic_radio_big_card_on, ic_radio_small_card_on } from '../../utils/assetHelper';
import { fetchSearchCountsAction } from '../../redux/actions/actionsSearchCount';
import { fLog } from '../../utils/utils';
import RBSheet from "react-native-raw-bottom-sheet";

const PAGE_SIZE = 20;
const ID_LIST_FETCHING = -1;
const DELAY_SEARCH_ON_KEYBOARD = 1500;
const DELAY_SEARCH_ON_MOUSE_OR_REFRESH = 200;

export const DUMMY_CATEGORY = { id: 0, name: "" };

// function refineForSearch(entriedAttributes) {
//     entriedAttributes.map(item => {
//         if (item.inputNumber === null)
//             item.inputNumber = 0;
//     });
//     return entriedAttributes;
// }

export interface IFilterableList {
    appearAt?: string;
    lng?: TLanguage;
    filterApi: string;
    localAdvertIds?: Array<string>;
    onRootSearchCountUpdate?: Dispatch<SetStateAction<any>>;
    commonFilter: ICommonFilter;
    categoryFilter?: ICategoryFilter;
    shortType?: string;
    forFilterOnlyData?: any;
    title?: string;
    isSearchAdvert: boolean;
    children?: any;
    onItemControllerClicks?: any;
    nocontent?: INoContent;
    itemTextPack?: TTextPack;
    navigation: any;
    searchTermFlag: boolean;
}
export default function FilterableList(props: IFilterableList): JSX.Element {

    const { appearAt, lng, filterApi, localAdvertIds, onRootSearchCountUpdate, commonFilter, shortType
        , categoryFilter, forFilterOnlyData, title, isSearchAdvert, children, onItemControllerClicks,
        nocontent, itemTextPack, navigation, searchTermFlag } = props;

    const TAG = "FilterableList";
    const rootContext = { isMobileSCreenSize: true, commonTexts: null };//: IRootContext = useContext(RootContext);
    // const routerLocation = useLocation();
    // const history = useHistory();
    const filterResultIds = useSelector(state => state.searchList.ids);
    const [searchCounts, setSearchCounts] = useState(new Map<number, number>());
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [currentPageDetails, setCurrentPageDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showHistoryTerms, setShowHistoryTerms] = useState(false)
    const [commitSearchTerm, setCommitSearchTerm] = useState("");
    const [sortType, setSortType] = useState("dpo|d");
    const [categoryName, setCategoryName] = useState("");
    const [categoryPath, setCategoryPath] = useState([]);
    const subQueriesRef: MutableRefObject<Map<TQuueryField, string>> = useRef<Map<TQuueryField, string>>(new Map<TQuueryField, string>());
    const previousSearchAdvertQueryRef = useRef(null);
    const previousSearchCountQueryRef = useRef(null);
    const texts = useSelector(state => state.localization.texts);
    const appearAtHome = appearAt === "home";
    const [isFatItem, setIsFatItem] = useState(true);
    const refRBSheet = useRef();
    const [sortModalOpen, setSortModalOpen] = useState(false);
    // const subCategoryCacheRef = rootContext.subCategoryCacheRef;
    // const loginInfo = rootContext.loginInfo;
    const dispatch = useDispatch();
    useEffect(() => {
        if (searchTermFlag) {
            setShowHistoryTerms(true)
        }
    }, [])
    const onTermChange = useCallback(function (term) {
        fLog(TAG, 'onTermChange = ', term);
        setSearchTerm(term);
    }, []);
    fLog(TAG, 'RENDER searchTerm = ', searchTerm, ' commitSearchTerm = ', commitSearchTerm);
    const fetchAdvertIds = useCallback((debugInfo) => {
        fLog(TAG, 'fetchAdvertIds debugInfo', debugInfo)
        const queryObject = getCompoundQuery(subQueriesRef.current);
        fLog(TAG, `fetchAdvertIds queryObject`, queryObject)

        /* TODO: FETCH IDS */
        setTimeout(function () {
            let currentQueryObject = getCompoundQuery(subQueriesRef.current)
            if (queryObject.query === currentQueryObject.query && (!previousSearchAdvertQueryRef.current || queryObject.query !== previousSearchAdvertQueryRef.current.query)) {
                fLog(TAG, `filter search  ${filterApi}`, 'post search!')
                // history.replace({ pathname: routerLocation.pathname, search: '?' + queryObject.query });
                setCurrentPageNumber(ID_LIST_FETCHING);

                let onError: IOnError = function (error: string) {
                    fLog(TAG, "POST '/lastestOffers' ERROR:", error);
                }

                // dispatch(resetSearchListAction())
                dispatch(fetchSearchListIdsAction({
                    language: lng as TLanguage,
                    query: queryObject.query,
                }, onError))

                previousSearchAdvertQueryRef.current = queryObject;
            }
            if (queryObject.query !== currentQueryObject.query) {
                fLog(TAG, `filter search  ${filterApi}`, 'not finish input yet....', queryObject.query, currentQueryObject.query)
            }
        }, previousSearchAdvertQueryRef.current && queryObject.keyBoardInputQuery !== previousSearchAdvertQueryRef.current.keyBoardInputQuery && !rootContext.isMobileSCreenSize
            ? DELAY_SEARCH_ON_KEYBOARD : DELAY_SEARCH_ON_MOUSE_OR_REFRESH);

    }, [appearAtHome, filterApi, localAdvertIds, lng, rootContext.isMobileSCreenSize, /*rootContext.searchResultIdsRef,history, routerLocation.pathname */]);

    const fetchSearchCounts = useCallback(() => {
        const queryObject = getCompoundQuery(subQueriesRef.current);
        setTimeout(function () {
            let currentQueryObject = getCompoundQuery(subQueriesRef.current)
            if (queryObject.query === currentQueryObject.query && (!previousSearchCountQueryRef.current || queryObject.query !== previousSearchCountQueryRef.current.query)) {
                fLog(TAG, 'SearchCounts', 'post SearchCounts! queryObject.query = ', queryObject.query)
                // window.history.replaceState(null, null, routerLocation.pathname + '?' + queryObject.query);
                // setCurrentPageNumber(ID_LIST_FETCHING);

                let onSuccess: IOnSearchCountsSuccess = function (data: ISearchCountItem[]) {
                    let currentQueryObject2 = getCompoundQuery(subQueriesRef.current)
                    if (currentQueryObject.query === currentQueryObject2.query) {
                        fLog(TAG, `/fetchSearchCountsAction IOnSearchCountsSuccess data`, data)
                        let searchCountArray: Array<ISearchCountItem> = data;
                        let searchCountMap = new Map();
                        searchCountArray.map((item: ISearchCountItem) => {
                            searchCountMap.set(item.id, item.count);
                        })
                        setSearchCounts(searchCountMap);
                    }
                }
                let onError: IOnError = function (error: string) {
                    fLog(TAG, "POST '/fetchSearchCountsAction' onError:", error);
                    setSearchCounts(new Map());
                }
                let param: IFetchSearchCountsParam = {
                    language: 'de',
                    query: queryObject.query
                };
                dispatch(fetchSearchCountsAction(param, onSuccess, onError))
                previousSearchCountQueryRef.current = queryObject;
            }
            if (queryObject.query !== currentQueryObject.query) {
                fLog(TAG, 'SearchCounts', 'not finish input yet....')
            }
        }, DELAY_SEARCH_ON_MOUSE_OR_REFRESH);
    }, [rootContext.isMobileSCreenSize, lng, onRootSearchCountUpdate, filterApi]);

    const onSearchTextCommit = useCallback(function (term) {
        fLog(TAG, 'onSearchTextCommit searchTerm = ', searchTerm);
        setCommitSearchTerm(term);
        setShowHistoryTerms(false);
    }, [searchTerm]);

    const onSortTypeSelect = useCallback(function (value) {
        setSortType(value)
    }, []);

    useEffect(() => {
        updateSubQueryRef(subQueriesRef, SEARCH_TERM, commitSearchTerm)
        fetchAdvertIds("searchTerm");
    }, [commitSearchTerm, fetchAdvertIds]);

    useEffect(() => {
        if (commonFilter.term) {
            setSearchTerm(commonFilter.term);
            setCommitSearchTerm(commonFilter.term);
        }
    }, [commonFilter.term])

    useEffect(() => {
        const [sf, so] = sortType.split("|");
        updateSubQueryRef(subQueriesRef, SORT_FIELD, sf);
        updateSubQueryRef(subQueriesRef, SORT_ORDER, so);
        fetchAdvertIds(SORT_ORDER);
    }, [sortType, fetchAdvertIds, fetchSearchCounts]);

    useEffect(() => {
        if (shortType)
            setSortType(shortType);
    }, [shortType])

    const dummyCategory = useMemo(() => ({
        id: 0, name: trans("apps.inallcategories", rootContext.commonTexts)
    }), [rootContext.commonTexts])

    const onLocationChange = useCallback((location, flushModalInputFlag) => {
        let { zip } = parseZipCity(location);
        fLog(TAG, 'on***Change onLocationChange zip = ', zip)
        updateSubQueryRef(subQueriesRef, SEARCH_LOCATION, zip);
        if (flushModalInputFlag)
            fetchAdvertIds(SEARCH_LOCATION);
        fetchSearchCounts();
    }, [fetchAdvertIds, fetchSearchCounts]);

    const onCategoryChange = useCallback((category, flushModalInputFlag) => {
        fLog(TAG, 'on***Change onCategoryChange', category, flushModalInputFlag)
        category = category || dummyCategory;
        setCategoryName(category.name);
        updateSubQueryRef(subQueriesRef, CATEGORY_ID, category.id);
        fLog(TAG, `onCategoryChange getCompoundQuery(subQueriesRef.current) `, getCompoundQuery(subQueriesRef.current))
        if (flushModalInputFlag)
            fetchAdvertIds(CATEGORY_ID);
        fetchSearchCounts();
    }, [fetchAdvertIds, fetchSearchCounts, dummyCategory]);

    const onCategoryPathChange = useCallback((categoryPath, flushModalInputFlag) => {
        fLog(TAG, 'on***Change categoryPath', categoryPath)
        setCategoryPath(categoryPath);
    }, []);

    const onInputNumberChange = useCallback((map, flushModalInputFlag) => {
        fLog(TAG, 'on***Change FilterableList onInputNumberChange map', map)
        updateSubQueryRef(subQueriesRef, ATTRIBUTE_RANGE_LIST_NUMBER, map)
        fetchSearchCounts();
        if (flushModalInputFlag)
            fetchAdvertIds(ATTRIBUTE_RANGE_LIST_NUMBER);
    }, [fetchAdvertIds, fetchSearchCounts]);

    const onInputDateChange = useCallback((map, flushModalInputFlag) => {
        fLog(TAG, 'on***Change FilterableList onInputDateChange map', map)
        updateSubQueryRef(subQueriesRef, ATTRIBUTE_RANGE_LIST_DATE, map)
        fetchSearchCounts();
        if (flushModalInputFlag)
            fetchAdvertIds(ATTRIBUTE_RANGE_LIST_DATE);
    }, [fetchAdvertIds, fetchSearchCounts]);

    const onInputTextChange = useCallback((map, flushModalInputFlag) => {
        fLog(TAG, 'on***Change FilterableList onInputTextChange map', map)
        updateSubQueryRef(subQueriesRef, ATTRIBUTE_TEXT_LIST, map)
        fetchSearchCounts();
        if (flushModalInputFlag)
            fetchAdvertIds(ATTRIBUTE_TEXT_LIST);
    }, [fetchAdvertIds, fetchSearchCounts]);

    const onSingleEntrySelectChange = useCallback((map, flushModalInputFlag) => {
        fLog(TAG, 'on***Change FilterableList onSingleEntrySelectChange map', map, flushModalInputFlag)
        updateSubQueryRef(subQueriesRef, ATTRIBUTE_ID_LIST, map)
        fetchSearchCounts();
        if (flushModalInputFlag)
            fetchAdvertIds(ATTRIBUTE_ID_LIST);
    }, [fetchAdvertIds, fetchSearchCounts]);

    const onMultiEntrySelectChange = useCallback((map, flushModalInputFlag) => {
        fLog(TAG, 'on***Change FilterableList onMultiEntrySelectChange map', map)
        updateSubQueryRef(subQueriesRef, ATTRIBUTE_MULTIID_LIST, map)
        fetchSearchCounts();
        if (flushModalInputFlag)
            fetchAdvertIds(ATTRIBUTE_MULTIID_LIST);
    }, [fetchAdvertIds, fetchSearchCounts]);

    // fLog(TAG, 'isLoading', isLoading)
    const onSearchTextFocus = useCallback(() => {
        fLog(TAG, ' onSearchTextFocus',);
        setShowHistoryTerms(true);
    }, [setShowHistoryTerms])

    const onSearchTextCancel = useCallback(() => {
        fLog(TAG, ' onSearchTextCancel',);
        setShowHistoryTerms(false);
        setTimeout(() => {
            setSearchTerm(`${commitSearchTerm}`);
        }, 200)
    }, [setShowHistoryTerms, commitSearchTerm])
    const onItemModePress = useCallback(
        () => {
            setIsFatItem(flag => !flag);
        },
        [setIsFatItem],
    )
    const onSortPress = useCallback(
        () => {
            setSortModalOpen(true);
            // refRBSheet.current.open()
        },
        [setSortModalOpen],
    )
    const onSortClosePress = useCallback(
        () => {
            setSortModalOpen(false);
            // refRBSheet.current.close()
        },
        [setSortModalOpen],
    )
    return <Fragment>
        <TextSearch
            value={`${searchTerm}`}
            onChange={onTermChange}
            onSearchTextCommit={onSearchTextCommit}
            btnText={trans("apps.action.search", rootContext.commonTexts)}
            onFocus={onSearchTextFocus}
            onCancel={onSearchTextCancel}
            showHistoryTerms={showHistoryTerms}
            searchTermFlag={searchTermFlag}
            navigation={navigation}></TextSearch>
        <View style={{ display: !showHistoryTerms ? 'flex' : 'none', flex: 1}}>
            <View style={FilterListStyles.header}>
                <Filter
                    editInputs={categoryFilter}
                    commonFilter={commonFilter}
                    isSearch={true}
                    onCategoryChange={onCategoryChange}
                    onCategoryPathChange={onCategoryPathChange}
                    onInputNumberChange={onInputNumberChange}
                    onInputDateChange={onInputDateChange}
                    onInputTextChange={onInputTextChange}
                    onSingleEntrySelectChange={onSingleEntrySelectChange}
                    onMultiEntrySelectChange={onMultiEntrySelectChange}
                    onLocationChange={onLocationChange}
                    searchCounts={searchCounts}
                    usedHomeModalOpenState={forFilterOnlyData ? forFilterOnlyData.usedHomeModalOpenState : null}
                    onHomeCategorySelected={forFilterOnlyData ? forFilterOnlyData.onHomeCategorySelected : null}
                ></Filter>

                <View style={FilterListStyles.sub_header}>
                    <Text style={FilterListStyles.sub_header_count}>
                        {formatString(title || trans("apps.resulttitle", texts), filterResultIds && filterResultIds.length, "")}
                        {filterResultIds.length}
                    </Text>
                    <TouchableOpacity style={FilterListStyles.item_mode_touch} onPress={onItemModePress}>
                        <Image
                            style={StyleSheet.compose(FilterListStyles.item_mode_icon, { display: isFatItem ? 'flex' : 'none' })}
                            source={ic_radio_big_card_on} />
                        <Image style={StyleSheet.compose(FilterListStyles.item_mode_icon, { display: !isFatItem ? 'flex' : 'none' })}
                            source={ic_radio_small_card_on} />
                    </TouchableOpacity>

                    {isSearchAdvert &&
                        <TouchableOpacity style={FilterListStyles.sort_text_touch} onPress={onSortPress}>
                            <Text style={FilterListStyles.sort_text}>{trans("apps.sorting", texts)}</Text>
                            <SortTypeSelectorModal
                                value={sortType}
                                onChange={onSortTypeSelect}
                                texts={texts}
                                isElevantAvailable={!!searchTerm}
                                isOpen={sortModalOpen}
                                onXClick={onSortClosePress}
                            />

                        </TouchableOpacity>
                    }
                </View>
            </View>

            {children}

            <AdvertList
                itemType={isFatItem ? ItemType.FAT : ItemType.MEDIUM}
                listType={ListType.SEARCH}
                itemClass="non-material-bordered"
                lng={"de"}
                navigation={navigation}
                nocontent={nocontent}/>
        </View>
    </Fragment >
}