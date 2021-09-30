import { actionTypes } from '../actions/actionTypes';
import { IXBaseAdvert } from '../../utils/xbaseInterface.d';
import { fLog } from '../../utils/utils';
let insertionListState = {
    isLoading: true,
    // isLoadingMore: false,
    ids: [],
    adverts: [],
    nextIdsToFetch: [],
}
const PAGE_SIZE = 20;
const TAG = "insert"
export const insertionListReducer = (state = insertionListState, action: any) => {
    let nextIdsToFetch: string[] = [];
    switch (action.type) {
        case actionTypes.INSERTION_LIST_RESET:
            return insertionListState;
        case actionTypes.INSERTION_LIST_IDS_SUCCESS:
            nextIdsToFetch = action.ids.slice(0, PAGE_SIZE)
            return { ...state, ids: action.ids, adverts: [], nextIdsToFetch, isLoading: nextIdsToFetch.length > 0 };
        case actionTypes.INSERTION_LIST_ADVERTS:
            return { ...state, nextIdsToFetch: [] };
        case actionTypes.INSERTION_LIST_ADVERTS_SUCCESS:
            let adverts = [...state.adverts, ...action.adverts];
            if (state.ids.length > adverts.length) {
                nextIdsToFetch = state.ids.slice(adverts.length, adverts.length + PAGE_SIZE)
            }
            return { ...state, adverts: adverts, nextIdsToFetch: nextIdsToFetch, isLoading: false };
        case actionTypes.INSERTION_LIST_ADVERTS_ERROR:
            return { ...state, nextIdsToFetch: action.errorIds };
        case actionTypes.INSERTION_LIST_ADVERT_UPDATE_SUCCESS:
            var index = state.adverts.findIndex(advert => advert._id == action.advert._id);
            fLog(TAG, 'action.advert._id = ', action.advert._id, "index = ", index);
            if (index !== -1) {
                state.adverts[index] = action.advert;
            }
            return { ...state, adverts: [...state.adverts] };
        case actionTypes.INSERTION_LIST_ADVERT_DELETE_SUCCESS:
            const foundIndex = state.ids.indexOf(action.id);
            const foundIndexInFetchList = state.nextIdsToFetch.indexOf(action.id);
            if (foundIndex >= 0) {
                state.ids.splice(foundIndex, 1)
                state.adverts.splice(foundIndex, 1)
            }
            if (foundIndexInFetchList >= 0)
                state.nextIdsToFetch.splice(foundIndexInFetchList, 1)
            return {
                ...state,
                ids: [...state.ids],
                adverts: [...state.adverts],
                nextIdsToFetch: [...state.nextIdsToFetch],
            };
        default:
            return state;
    }
}