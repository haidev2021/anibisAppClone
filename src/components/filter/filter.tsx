
import lodash from 'lodash';
import React, { Component, Fragment, useState, useEffect, useLayoutEffect, useRef, useCallback, useContext, useMemo, Dispatch, SetStateAction } from 'react';
import AttType, { isSelectType, isSelectMultiType, getFilterAttributeMapId, FORCE_SELECT_SINGLE, ENTRY_ID, ENTRY_IDS, INPUT_NUMBER, INPUT_TEXT, INPUT_DATE, ATT_MAP_IDS, resolveIsAttributeButtonHasData, resolveIsAttributeHasData, resolveAttributeButtonReset, /*resolveIsAttributeButtonHasData, resolveAttributeButtonReset */ } from './attribute/attributeFactory';
import { CATEGORY_FIRST_INPUT_OFFSET_Y, formatString, trans, USED_SET_STATE_INDEX, USED_STATE_INDEX} from '../../utils/common';
import { XBASE_GET_SUBCATEGORIES_API, XBASE_GET_CATEGORY_PATH_BY_ID_API, XBASE_ATTRIBUTES_BY_CAT_ID_API } from '../../utils/network';

import { LocationSearch } from './locationSearch';
import AttributeList from './attribute/attributeList';
import { FilterButtons } from './buttons/filterButtons';
import { IDetailAttribute, IXBaseAttribute, IXBaseCategory, TTextPack, TAttributeState, TAttributeSetState, IRootContext } from '../../utils/xbaseInterface.d';
import CenterAnchoredModal from '../../sharedcomponents/centerAnchoredModal/centerAnchoredModal';
import CategoryModal from '../categoryModal/categoryModal';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { getSubCategories, getCategoryPathById } from '../../utils/xbase/model/category';
import { attributesByCatId } from '../../utils/xbase/model/attribute';
import { FilterStyles } from './filterStyles';
import AttributeKeyValueList from './attribute/attributeList';
import { LocationSearchController } from './locationSearchController';
import AttributeControllerModal from './attribute/attributeControllerModal';
import { fLog } from '../../utils/utils';
import { useSelector } from 'react-redux';
import MandatoryAlertMark from '../../sharedcomponents/mandatoryAlert/mandatoryAlertMark';

export const FilterContext = React.createContext(null);
const FIXED_PRICE = 15218;
const EMPTY_XBASE_ATTRIBUTES: IXBaseAttribute[] = [];

interface filterStateS {
    location: string;
    selectedCat: IXBaseCategory | null;
    parentCats: Array<IXBaseCategory>;
    xBaseAttributes: IXBaseAttribute[];
    attributes: Array<TAttributeState>;
}

interface IFilterProps {
    editInputs: any;
    isSearch: boolean;
    isValidating?: boolean;
    onCategoryChange: (category: IXBaseCategory | null, flush: boolean) => void;
    onCategoryPathChange: (categoryPath: Array<IXBaseCategory>, flush: boolean) => void;
    onInputNumberChange: (attMap: TAttributeState, flush: boolean) => void;
    onInputDateChange: (attMap: TAttributeState, flush: boolean) => void;
    onInputTextChange: (attMap: TAttributeState, flush: boolean) => void;
    onSingleEntrySelectChange: (attMap: TAttributeState, flush: boolean) => void;
    onMultiEntrySelectChange: (attMap: TAttributeState, flush: boolean) => void;
    onXBaseAttributeChange?: (atts: Array<IXBaseAttribute>) => void;
    usedHomeModalOpenState?: [boolean, Dispatch<SetStateAction<boolean>>];
    onHomeCategorySelected?: (cat: IXBaseCategory | null) => void;
    onLocationChange?: (location: string, flush: boolean) => void;
    searchCounts?: Map<number, number>;
    commonFilter?: any;
    onCategoryError?: (error: string) => void;
    onAttributeError?: (error: string) => void;
}

export function Filter(props: IFilterProps) {
    const { editInputs,
        isSearch,
        isValidating,
        onCategoryChange,
        onCategoryPathChange,
        onInputNumberChange,
        onInputDateChange,
        onInputTextChange,
        onSingleEntrySelectChange,
        onMultiEntrySelectChange,
        onXBaseAttributeChange,
        usedHomeModalOpenState,
        onHomeCategorySelected,
        onLocationChange,
        searchCounts,
        commonFilter,
        onCategoryError,
        onAttributeError,
    } = props;

    // const rootContext: IRootContext = useContext(RootContext);
    const TAG = "Filter"
    const insertionContext = { textPack: null };//useContext(InsertionContext);
    const validationContext = { isValidating: false };//useContext(ValidationContext);
    const [location, setLocation] = useState<string>("");
    const [selectedCat, setSelectedCat] = useState<IXBaseCategory | null>(null);
    const [parentCats, setParentCats] = useState<Array<IXBaseCategory>>([]);
    const [subCats, setSubCats] = useState<Array<IXBaseCategory>>([]);
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [innerCategoryModalOpen, setInnerCategoryModalOpen] = useState<boolean>(false);
    const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
    const [xBaseAttributes, setXBaseAttributes] = useState<Array<IXBaseAttribute>>(EMPTY_XBASE_ATTRIBUTES);
    const [singleFilterItemId, setSingleFilterItemId] = useState<number | string>("");
    const [isControllerOpened, setIsControllerOpened] = useState(false);
    const [isInnerControllerOpened, setIsInnerControllerOpened] = useState(false);
    const texts = useSelector(state => state.localization.texts);

    const usedInputMaps: Array<[TAttributeState, TAttributeSetState]> = [
        useState<TAttributeState>(() => new Map()),
        useState<TAttributeState>(() => new Map()),
        useState<TAttributeState>(() => new Map()),
        useState<TAttributeState>(() => new Map()),
        useState<TAttributeState>(() => new Map())
    ];
    const currentFilterInputMapRef = useRef<Array<filterStateS>>([]);
    const [fetchAdvertFlag, setFetchAdvertFlag] = useState<boolean>(true);
    const isMobileSCreenSize = true;//rootContext.isMobileSCreenSize;
    const isSubCatInline = false;//isSearch && !isMobileSCreenSize;
    // const subCategoryCacheRef = rootContext.subCategoryCacheRef;
    // const commonTexts = rootContext.commonTexts;
    // const categoryAttributesCacheRef = rootContext.categoryAttributesCacheRef;

    const pushCurrentFilterInput = useCallback((debugInfo: string) => {
        fLog(TAG, `catButton pushCurrentFilterInput PUSH price = `, lodash.cloneDeep(usedInputMaps[0][USED_STATE_INDEX]))
        currentFilterInputMapRef.current.push({
            location: location,
            selectedCat: selectedCat,
            parentCats: parentCats,
            xBaseAttributes: xBaseAttributes,
            attributes: Array.from(ATT_MAP_IDS, id => lodash.cloneDeep(usedInputMaps[id][USED_STATE_INDEX]))
        });
        fLog(TAG, `selectedCat push stack = `, selectedCat, ' location = ', location)
    }, [location, parentCats, selectedCat, usedInputMaps, xBaseAttributes]);

    const popCurrentFilterInput = useCallback((isBottomApplyPressed?: boolean) => {
        const topStack = currentFilterInputMapRef.current.pop();
        if (topStack && !isBottomApplyPressed) {
            setLocation(topStack.location);
            setSelectedCat(topStack.selectedCat);
            setParentCats(topStack.parentCats);
            setXBaseAttributes(topStack.xBaseAttributes);
            topStack.attributes.map((item, index) => usedInputMaps[index][USED_SET_STATE_INDEX](item))
        }
        return topStack;
    }, [usedInputMaps, selectedCat]);

    fLog(TAG, `RENDER selectedCat = `, selectedCat)
    const catMapForClick = useMemo(() => {
        let result = new Map();
        if (parentCats && subCats)
            [...parentCats, ...subCats].map(item => {
                result.set(item.id, item);
            })
        // fLog(TAG, 'catMapForClick useMemo', result)
        return result;
    }, [parentCats, subCats]);

    useEffect(() => {
        const noModalOpened = !categoryModalOpen && !filterModalOpen && !isControllerOpened;
        setFetchAdvertFlag(noModalOpened);
        fLog(TAG, `setFetchAdvertFlag useEffect  = `, noModalOpened)
    }, [categoryModalOpen, filterModalOpen, isControllerOpened]);
    fLog(TAG, `xBaseAttributes xBaseAttributes xBaseAttributes length = `, xBaseAttributes.length)

    fLog(TAG, 'fetchAdvertFlag', fetchAdvertFlag)
    useEffect(() => {
        fLog(TAG, 'editInputs', editInputs && editInputs.categoryId)
        if (editInputs) {
            let categoryId = editInputs.categoryId;
            fLog(TAG, `editInputs if`)
            if (categoryId || categoryId === 0) {
                fLog(TAG, `editInputs if if categoryId = `, categoryId)
                getCategoryPathById({ id: categoryId, lng: "de" }, (xbaseCats: IXBaseCategory[]) => {
                    fLog(TAG, `editInputs if if xbaseCats = `, xbaseCats)
                    setParentCats(xbaseCats);
                    let leafCat = xbaseCats[xbaseCats.length - 1]
                    setSelectedCat(leafCat);
                    fLog(TAG, `setSelectedCat 2 `, leafCat)
                    fetchSubCategory(leafCat, false);
                    updateAttributeSection(leafCat, "useEffect editInputs");
                })
            }
        } else {
            fLog(TAG, `editInputs else`)
            setParentCats([]);
            setSelectedCat(null);
            fLog(TAG, `setSelectedCat 3 `, null)
            updateAttributeSection(null, "useEffect editInputs");
            // setSubCats([]);
            // fLog(TAG, 'setSubCats getCategoryPathById 2', [])
        }
    }, [editInputs && editInputs.categoryId]);

    useEffect(() => {
        if (commonFilter && commonFilter.location)
            setLocation(commonFilter.location);
    }, [commonFilter && commonFilter.location])


    function zipCityView() {
        return <LocationSearch value={location} onChange={setLocation} isSearch={true} />
    }

    function zipCityControllerView() {
        return <LocationSearchController value={location} onChange={setLocation} isSearch={true} />
    }

    const updateUsedInputMaps = useCallback(function (xBaseAttributes: IXBaseAttribute[], oldCatAttData?: Map<number, any>) {
        // fLog(TAG, 'updateUsedInputMaps populatedCat', populatedCat)
        // entriedAttributeMapRef.current = new Map();
        const newInputMaps = Array.from(ATT_MAP_IDS, (item) => new Map());
        xBaseAttributes.map((att: IXBaseAttribute) => {
            let mapToUse = newInputMaps[getFilterAttributeMapId(att.type) as number];
            let editInput = editInputs && editInputs.attributes && editInputs.attributes.find((detailAtt: IDetailAttribute) => att.id === detailAtt.attributeId);
            fLog(TAG, 'updateUsedInputMaps editInput', editInput)
            let defaultInput: IDetailAttribute = {
                attributeId: att.id,
                attributeEntryIds: !isSearch && isSelectType(att.type) && att.defaultSelectItemId ? [att.defaultSelectItemId] : null,
                attributeEntryId: !isSearch && isSelectType(att.type) ? att.defaultSelectItemId as number : null,
                inputText: null,
                inputNumber: null,
                inputDate: '',//'2020-10-15'
            }
            mapToUse.set(att.id, editInput || oldCatAttData && oldCatAttData.get(att.id) || defaultInput);
        });

        ATT_MAP_IDS.map(item => {
            usedInputMaps[item][USED_SET_STATE_INDEX](newInputMaps[item]);
            fLog(TAG, `popCurrentFilterInput updateUsedInputMaps item = `, item, 'newInputMaps[item] = ', newInputMaps[item])
        })
    }, [editInputs, isSearch, usedInputMaps])

    const updateAttributeSection = useCallback(function (cat: IXBaseCategory | null, debugInfo: string) {
        setXBaseAttributes(EMPTY_XBASE_ATTRIBUTES);
        fLog(TAG, 'updateAttributeSection cat', cat, 'debugInfo', debugInfo)
        if (cat || isSearch) {
            const categoryId = cat ? cat.id : 0;
            /*TODO: CACHE ATTS
            if (!categoryAttributesCacheRef.current.has(rootContext.language)) {
                categoryAttributesCacheRef.current.set(rootContext.language, new Map())
            }
            
            if (categoryAttributesCacheRef.current.get(rootContext.language).get(categoryId)) {
                setXBaseAttributes(categoryAttributesCacheRef.current.get(rootContext.language).get(categoryId));
            } else {
            }
            */

            let oldCatAttData = new Map();
            ATT_MAP_IDS.map((index) => {
                let inputMapState = usedInputMaps[index][USED_STATE_INDEX]
                inputMapState.forEach((value, key) => {
                    let att = xBaseAttributes.find((item: IXBaseAttribute) => item.id == key) as IXBaseAttribute
                    let hasData = resolveIsAttributeHasData(att, inputMapState)
                    if (hasData)
                        oldCatAttData.set(key, value)
                })
            })

            attributesByCatId({ id: categoryId, lng: "de", isSearch: isSearch }, (result: IXBaseAttribute[]) => {
                fLog(TAG, 'updateAttributeSection result', result)
                // fLog(TAG, result);
                setXBaseAttributes(result);
                updateUsedInputMaps(result, oldCatAttData);
                // xBaseCatAttMap.current = new Map();
                // result.map((att: IXBaseAttribute) => {
                //     xBaseCatAttMap.current.set(att.id, att)
                // });
            })
        } else {
            updateUsedInputMaps([]);
            setXBaseAttributes(EMPTY_XBASE_ATTRIBUTES);
        }
    }, [isSearch, /*TODO LANGUAGE rootContext.language, */updateUsedInputMaps]);

    const fetchSubCategory = useCallback(function (cat: IXBaseCategory | null, openModal?: boolean) {
        fLog(TAG, 'fetchSubCategoryopenModal openModal', openModal)
        // setCurCatLevel(lv => (id ? lv + 1 : 0));
        const willModalOpen = (isMobileSCreenSize || !isSearch) && openModal !== false;
        fLog(TAG, 'fetchSubCategory selectedCat', selectedCat)
        // if (!categoryModalOpen && willModalOpen)
        //     pushCurrentFilterInput("fetchSubCategory");

        /* TODO: CACHE CATS
        let id = cat ? cat.id : null;
        if (!subCategoryCacheRef.current.has(rootContext.language)) {
            subCategoryCacheRef.current.set(rootContext.language, new Map())
        }
        
        if (subCategoryCacheRef.current.get(rootContext.language).has(id)) {
            fLog(TAG, 'subCategoryCacheRef.current[rootContext.language] has ', id);
            setSubCats(subCategoryCacheRef.current.get(rootContext.language).get(id));
            fLog(TAG, 'setSubCats subCategoryCacheRef', subCategoryCacheRef.current.get(rootContext.language).get(id))
        } else {
                
        }
        */
        getSubCategories({ id: cat ? cat.id : null, lng: 'de' }, (result: any) => {
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
    }, [!isSearch, isMobileSCreenSize, selectedCat, categoryModalOpen, pushCurrentFilterInput/*, subCategoryCacheRef, rootContext.language*/]);

    // fLog(TAG, 'draw subCats', subCats)

    useEffect(() => {
        if (usedHomeModalOpenState && usedHomeModalOpenState[USED_STATE_INDEX]) {
            setCategoryModalOpen(usedHomeModalOpenState[USED_STATE_INDEX]);
            fetchSubCategory(null);
            usedHomeModalOpenState[USED_SET_STATE_INDEX](false);
        }
    }, [usedHomeModalOpenState && usedHomeModalOpenState[USED_STATE_INDEX], usedHomeModalOpenState, fetchSubCategory]);

    const onCategoryClick = useCallback(function (cat: IXBaseCategory | null, isInner: boolean) {
        if (isInner)
            setInnerCategoryModalOpen(true);
        else
            setCategoryModalOpen(true);
        if (!isSearch && editInputs && editInputs.categoryPath) {
            // alert("Can not modify category once posted");
            return;
        } else {
            if (!!isSearch && cat != selectedCat) {
                setSelectedCat(cat);
                fLog(TAG, `setSelectedCat 4 `, cat)
                updateAttributeSection(cat, "onCategoryModalBottomButtonClick");
            }
            fetchSubCategory(cat);
        }
    }, [editInputs, fetchSubCategory, isSearch, updateAttributeSection]);

    const onRootCategoryClick = useCallback(function (isInner): void {
        onCategoryClick(null, isInner);
    }, [onCategoryClick]);

    const onSubCategoryClick = useCallback(function (cat: IXBaseCategory, isInner): void {
        fLog(TAG, 'catMapForClick onCategoryClick cat', cat)
        onCategoryClick(cat, isInner);
    }, [onCategoryClick, catMapForClick]);

    const entryIdAttMap = usedInputMaps[ENTRY_ID][USED_STATE_INDEX];
    const entryIdsAttMap = usedInputMaps[ENTRY_IDS][USED_STATE_INDEX];
    const inputNumberAttMap = usedInputMaps[INPUT_NUMBER][USED_STATE_INDEX];
    const inputTextAttMap = usedInputMaps[INPUT_TEXT][USED_STATE_INDEX];
    const inputDateAttMap = usedInputMaps[INPUT_DATE][USED_STATE_INDEX];

    useEffect(() => {
        if (onLocationChange) {
            onLocationChange(location, fetchAdvertFlag);
        }
    }, [onLocationChange, location, fetchAdvertFlag])

    useEffect(() => {
        if (onCategoryChange) {
            onCategoryChange(selectedCat, fetchAdvertFlag);
        }
    }, [onCategoryChange, selectedCat, fetchAdvertFlag])

    useEffect(() => {
        if (onCategoryPathChange) {
            onCategoryPathChange(parentCats, fetchAdvertFlag);
        }
    }, [onCategoryPathChange, parentCats, fetchAdvertFlag])

    useEffect(() => {
        if (onSingleEntrySelectChange) {
            onSingleEntrySelectChange(entryIdAttMap, fetchAdvertFlag);
        }
    }, [onSingleEntrySelectChange, entryIdAttMap, fetchAdvertFlag])

    useEffect(() => {
        if (onMultiEntrySelectChange) {
            onMultiEntrySelectChange(entryIdsAttMap, fetchAdvertFlag);
        }
    }, [onMultiEntrySelectChange, entryIdsAttMap, fetchAdvertFlag])

    useEffect(() => {
        if (onInputNumberChange) {
            onInputNumberChange(inputNumberAttMap, fetchAdvertFlag);
        }
    }, [onInputNumberChange, inputNumberAttMap, fetchAdvertFlag])

    useEffect(() => {
        if (onInputTextChange) {
            onInputTextChange(inputTextAttMap, fetchAdvertFlag);
        }
    }, [onInputTextChange, inputTextAttMap, fetchAdvertFlag])

    useEffect(() => {
        if (onInputDateChange) {
            onInputDateChange(inputDateAttMap, fetchAdvertFlag);
        }
    }, [onInputDateChange, inputDateAttMap, fetchAdvertFlag])

    useEffect(() => {
        if (onXBaseAttributeChange)
            onXBaseAttributeChange(xBaseAttributes);
    }, [onXBaseAttributeChange, xBaseAttributes])

    const onFilterModalBottomButtonClick = useCallback(() => {
        fLog(TAG, 'onFilterModalBottomButtonClick')
        popCurrentFilterInput(true);
        setFilterModalOpen(false);
        // // setFetchAdvertFlag(true);
        fLog(TAG, `setFetchAdvertFlag onFilterModalBottomButtonClick  = true`)
    }, [popCurrentFilterInput, setFilterModalOpen, setFetchAdvertFlag])

    const onFilterModalCancelClick = useCallback(() => {
        popCurrentFilterInput(false);
        setFilterModalOpen(false);
    }, [popCurrentFilterInput, setFilterModalOpen])

    const refillSharedAttInput = useCallback(() =>
        popCurrentFilterInput(true), [popCurrentFilterInput])

    const onCategoryModalBottomButtonClick = useCallback((isInner) => {
        const topStack = popCurrentFilterInput(true);
        if (isInner)
            setInnerCategoryModalOpen(false);
        else
            setCategoryModalOpen(false);
        let cat = parentCats.length > 0 ? parentCats[parentCats.length - 1] : null;
        setSelectedCat(cat as IXBaseCategory);
        updateAttributeSection(cat, "onCategoryModalBottomButtonClick");
        if (onHomeCategorySelected)
            onHomeCategorySelected(cat);
        fLog(TAG, `setFetchAdvertFlag onCategoryModalBottomButtonClick  = `, !isInner)
        fLog(TAG, `onCategoryModalBottomButtonClick topStack`, topStack)
    }, [isMobileSCreenSize, filterModalOpen, onHomeCategorySelected, parentCats, popCurrentFilterInput, updateAttributeSection, refillSharedAttInput]);

    useEffect(() => {
        if (!isSearch && parentCats.length > 0 && subCats.length === 0 &&
            selectedCat !== parentCats[parentCats.length - 1]) {
            const INSERTION_USE_INNER_MODAL = false;//TODO: INSETRION FILTER
            onCategoryModalBottomButtonClick(INSERTION_USE_INNER_MODAL);
        }
    }, [parentCats, subCats, isSearch, selectedCat, onCategoryModalBottomButtonClick]);

    fLog(TAG, 'render', "Filter AttributeInputText");

    const onCategoryModalCancelClick = useCallback((isInner) => {
        if (isInner)
            setInnerCategoryModalOpen(false);
        else
            setCategoryModalOpen(false);
        popCurrentFilterInput(false);
    }, [setInnerCategoryModalOpen, setCategoryModalOpen, popCurrentFilterInput])

    const getFilterModalButtonText = useCallback(() => {
        fLog(TAG, 'getFilterModalButtonText selectedCat', selectedCat)
        const count = (searchCounts as Map<number, number>).get(selectedCat && selectedCat.id || 0) as number;
        let text = count !== null && trans("apps.action.showresultsfromcategories_" + (count > 1 ? "n" : (count === 1 ? "1" : "0")), texts) || "";
        text = count >= 1 ? formatString(text, count) : text;
        fLog(TAG, 'getFilterModalButtonText', text)
        return text;
    }, [selectedCat, searchCounts])

    const onControllerXPress = useCallback((isInner) => {
        fLog(TAG, `onControllerXPress isInner = `, isInner)
        if (isInner)
            setIsInnerControllerOpened(false);
        else
            setIsControllerOpened(false);
        popCurrentFilterInput(false);
    }, [setIsControllerOpened, setIsInnerControllerOpened, popCurrentFilterInput])

    const onControllerOKPress = useCallback((isInner) => {
        if (isInner)
            setIsInnerControllerOpened(false);
        else
            setIsControllerOpened(false);
        // setFetchAdvertFlag(!isInner);
        fLog(TAG, `setFetchAdvertFlag onControllerOKPress  = `, !isInner)
        popCurrentFilterInput(true);
    }, [setIsControllerOpened, setIsInnerControllerOpened, popCurrentFilterInput])

    useEffect(() => {
        if (onCategoryError)
            onCategoryError(!selectedCat && isValidating ? trans("apps.insertion.errordatastatefailadvertcategoryismissing", texts) : "")
    }, [isValidating, selectedCat, onCategoryError])

    useEffect(() => {
        if (onAttributeError)
            onAttributeError(!selectedCat && isValidating ? trans("apps.insertion.errordatastatefailadvertcategoryismissing", texts) : "")
    }, [isValidating, selectedCat])

    function renderIXBaseCategorySelector() {
        return <View style={FilterStyles.filter_group}>
            <TouchableOpacity style={FilterStyles.filter_item}
                onPress={() => {
                    pushCurrentFilterInput("onCategoryClick");
                    onCategoryClick(selectedCat, true)
                }}>

                <Text style={FilterStyles.filter_item_key}>{trans("apps.category", texts)}</Text>

                <Text style={selectedCat ? FilterStyles.filter_item_value : FilterStyles.filter_item_value_all}>
                    {selectedCat ? selectedCat.name : trans("apps.all", texts)}
                </Text>

                {!selectedCat && isValidating && <MandatoryAlertMark text={trans("apps.insertion.errordatastatefailadvertcategoryismissing", texts)}></MandatoryAlertMark>}
            </TouchableOpacity>
        </View>
    }

    function renderAllFilterContent() {
        return <Fragment >
            {renderIXBaseCategorySelector()}
            <AttributeKeyValueList
                xBaseAttributes={xBaseAttributes}
                usedInputMaps={usedInputMaps}
                singleFilterItemId={singleFilterItemId}
                setSingleFilterItemId={setSingleFilterItemId}
                setIsControllerOpened={setIsInnerControllerOpened}
                pushCurrentFilterInput={pushCurrentFilterInput}
                isValidating={isValidating}
                isSearch={isSearch}
                onAttributeError={onAttributeError}>
                {isSearch ? zipCityView() : null}
            </AttributeKeyValueList>

            <AttributeControllerModal
                id="INNER_ATT_CONTROLLER_MODAL"
                onXClick={() => onControllerXPress(true)}
                isOpen={isInnerControllerOpened}
                onBottomButtonClick={() => onControllerOKPress(true)}
                xBaseAttributes={xBaseAttributes}
                usedInputMaps={usedInputMaps}
                singleFilterItemId={singleFilterItemId}
                zipCityControllerView={isSearch ? zipCityControllerView() : null}
                isSearch={isSearch} />

            <CategoryModal
                id="INNER_CATEGORY_MODAL"
                historiedCats={[]}
                isOpen={innerCategoryModalOpen}
                onBottomButtonClick={() => onCategoryModalBottomButtonClick(true)}
                onXClick={() => onCategoryModalCancelClick(true)}
                parentCats={parentCats}
                subCats={subCats}
                searchCounts={searchCounts}
                onRootCategoryClick={() => onRootCategoryClick(true)}
                onSubCategoryClick={(cat) => onSubCategoryClick(cat, true)}
                bottomButtonText={getFilterModalButtonText()}
                hideBottomButton={!isSearch && subCats.length > 0}
            ></CategoryModal>
        </Fragment>
    }

    function renderFilterModal() {
        // if (isSearch && isMobileSCreenSize)
        const headerDisplay = singleFilterItemId ? 'none' : 'flex';
        return isSearch ? <CenterAnchoredModal className="all-filters" isOpen={filterModalOpen}
            onXClick={onFilterModalCancelClick} onBottomButtonClick={onFilterModalBottomButtonClick}
            bottomButtonText={getFilterModalButtonText()} smallMarginBottom={true} title={trans("apps.filter", texts)}>
            {renderAllFilterContent()}
        </CenterAnchoredModal> : renderAllFilterContent()
    }

    const onCategoryFilterButtonClick = useCallback(() => {
        pushCurrentFilterInput("onCategoryButtonClick");
        fLog(TAG, 'onCategoryButtonClick selectedCat', selectedCat)
        onCategoryClick(selectedCat, false)
    }, [selectedCat, onCategoryClick, pushCurrentFilterInput])

    const onCategoryFilterButtonResetClick = useCallback(() => {
        // pushCurrentFilterInput("onCategoryButtonClick");
        setSelectedCat(null);
        updateAttributeSection(null, "onCategoryResetButtonClick");
        // popCurrentFilterInput(false);
    }, [updateAttributeSection, setSelectedCat])


    const onFilterItemButtonClick = useCallback((clickData: string) => {
        fLog(TAG, 'onFilterItemButtonClick', clickData)
        pushCurrentFilterInput("onFilterItemButtonClick");
        switch (clickData) {
            case "city":
                setSingleFilterItemId("city");
                break;
            default:
                const id = clickData.split("-")[0];
                setSingleFilterItemId(id);
                break;
        }
        // setFetchAdvertFlag(false);
        fLog(TAG, `setFetchAdvertFlag onControllerOKPress  = false`)
        setIsControllerOpened(true);
    }, [pushCurrentFilterInput, setFetchAdvertFlag, setIsControllerOpened, setSingleFilterItemId])

    const onFilterItemResetButtonClick = useCallback((clickData: string) => {
        switch (clickData) {
            case "city":
                setLocation("");
                break;
            default:
                const [id, type] = clickData.split("-");
                if (id && type) {
                    resolveAttributeButtonReset({ id: Number.parseInt(id), type: Number.parseInt(type) }, usedInputMaps)
                }
                break;
        }
    }, [setLocation, usedInputMaps])

    const onAllFilterButtonClick = useCallback(() => {
        pushCurrentFilterInput("onAllFilterButtonClick");
        setSingleFilterItemId(null);
        // setFetchAdvertFlag(false);
        fLog(TAG, `setFetchAdvertFlag onAllFilterButtonClick  = false`)
        setFilterModalOpen(true);
        // e.stopPropagation();
    }, [pushCurrentFilterInput, setFetchAdvertFlag, setFilterModalOpen, setSingleFilterItemId])

    return <View style={isSearch ? FilterStyles.filter_container_search : FilterStyles.filter_container_insertion}>
        {/* <FilterContext.Provider value={{ isSearch: isSearch, categoryId: selectedCat ? selectedCat.id : 0, textPack: textPack }}> */}
        {/* {JSON.stringify(searchCounts)} */}
        {isSearch &&
            <FilterButtons
                categoryFilterButtonCaption={selectedCat ? selectedCat.name : trans("apps.inallcategories", texts)}
                categoryFilterButtonHasData={!!(selectedCat && selectedCat.id)}
                onCategoryFilterButtonClick={onCategoryFilterButtonClick}
                onCategoryFilterButtonResetClick={onCategoryFilterButtonResetClick}
                locationFilterButtonCaption={location ? location : trans("apps.location", texts)}
                locationFilterButtonHasData={!!location}
                onFilterItemButtonClick={onFilterItemButtonClick}
                onFilterItemResetButtonClick={onFilterItemResetButtonClick}
                onAllFilterButtonClick={onAllFilterButtonClick}
                xBaseAttributes={xBaseAttributes}
                usedInputMaps={usedInputMaps}
                location={location}
            ></FilterButtons>}

        {renderFilterModal()}

        <CategoryModal
            id="OUTER_CATEGORY_MODAL"
            historiedCats={[]}
            isOpen={!isSubCatInline && categoryModalOpen}
            onXClick={() => onCategoryModalCancelClick(false)}
            onBottomButtonClick={() => onCategoryModalBottomButtonClick(false)}
            parentCats={parentCats}
            subCats={subCats}
            searchCounts={searchCounts}
            onRootCategoryClick={() => onRootCategoryClick(false)}
            onSubCategoryClick={(cat) => onSubCategoryClick(cat, false)}
            bottomButtonText={getFilterModalButtonText()}
            hideBottomButton={!isSearch && subCats.length > 0}
        ></CategoryModal>

        {/* </FilterContext.Provider> */}

        <AttributeControllerModal
            id="OUTER_ATT_CONTROLLER_MODAL"
            onXClick={() => onControllerXPress(false)}
            isOpen={isControllerOpened}
            onBottomButtonClick={() => onControllerOKPress(false)}
            xBaseAttributes={xBaseAttributes}
            usedInputMaps={usedInputMaps}
            singleFilterItemId={singleFilterItemId}
            zipCityControllerView={isSearch ? zipCityControllerView() : null}
            isSearch={isSearch}
        ></AttributeControllerModal>
    </View>;
}