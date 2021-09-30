import { actionTypes } from '../actions/actionTypes';
import { IXBaseAdvert } from '../../utils/xbaseInterface.d';
let searchListState = {
    isLoading: true,
    // isLoadingMore: false,
    ids: [],
    adverts: [],
    nextIdsToFetch: [],
}
const PAGE_SIZE = 20;

export const searchListReducer = (state = searchListState, action: any) => {
    let nextIdsToFetch: string[] = [];
    switch (action.type) {
        case actionTypes.SEARCH_LIST_RESET:
            return searchListState;
        case actionTypes.SEARCH_LIST_IDS:
            return searchListState;
        case actionTypes.SEARCH_LIST_IDS_SUCCESS:
            nextIdsToFetch = action.ids.slice(0, PAGE_SIZE)
            return { ...state, isLoading: nextIdsToFetch.length > 0, ids: action.ids, adverts: [], nextIdsToFetch }
        case actionTypes.SEARCH_LIST_ADVERTS:
            return { ...state, nextIdsToFetch: [] };
        case actionTypes.SEARCH_LIST_ADVERT_SUCCESS:
            let adverts = [...state.adverts, ...action.adverts];
            if (state.ids.length > adverts.length)
                nextIdsToFetch = state.ids.slice(adverts.length, adverts.length + PAGE_SIZE)
            return { ...state, isLoading: false, adverts: adverts, nextIdsToFetch: nextIdsToFetch };
        case actionTypes.SEARCH_LIST_ADVERT_ERROR:
            return { ...state, nextIdsToFetch: action.errorIds };
        default:
            return state;
    }
}