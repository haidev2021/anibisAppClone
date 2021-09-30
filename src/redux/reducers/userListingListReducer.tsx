import { actionTypes } from '../actions/actionTypes';
import { IXBaseAdvert } from '../../utils/xbaseInterface.d';
let userListingListState = {
    isLoading: true,
    // isLoadingMore: false,
    ids: [],
    adverts: [],
    nextIdsToFetch: [],
}
const PAGE_SIZE = 20;
function compareArrays(a: any, b: any) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export const userListingListReducer = (state = userListingListState, action: any) => {
    function isNewUserListingStarted(adverts: IXBaseAdvert[], ids: string[]) {
        const extractedIdsFromAdverts = Array.from(adverts, advert => advert._id);
        const idsSliced = ids.slice(0, adverts.length)
        return compareArrays(extractedIdsFromAdverts, idsSliced)
    }
    let nextIdsToFetch: string[] = [];
    switch (action.type) {
        case actionTypes.USER_LISTING_LIST_RESET:
            return userListingListState;
        case actionTypes.USER_LISTING_LIST_IDS:
            return userListingListState;
        case actionTypes.USER_LISTING_LIST_IDS_SUCCESS:
            nextIdsToFetch = action.ids.slice(0, PAGE_SIZE)
            return { ...state, isLoading: nextIdsToFetch.length > 0, ids: action.ids, adverts: [], nextIdsToFetch }
        case actionTypes.USER_LISTING_LIST_ADVERTS:
            return { ...state, nextIdsToFetch: [] };
        case actionTypes.USER_LISTING_LIST_ADVERT_SUCCESS:
            let adverts = [...state.adverts, ...action.adverts];
            if (!isNewUserListingStarted(adverts, state.ids))
                return state;
            if (state.ids.length > adverts.length)
                nextIdsToFetch = state.ids.slice(adverts.length, adverts.length + PAGE_SIZE)
            return { ...state, isLoading: false, adverts: adverts, nextIdsToFetch: nextIdsToFetch };
        case actionTypes.USER_LISTING_LIST_ADVERT_ERROR:
            return { ...state, nextIdsToFetch: action.errorIds };
        default:
            return state;
    }
}