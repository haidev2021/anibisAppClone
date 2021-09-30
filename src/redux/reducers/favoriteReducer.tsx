import { actionTypes } from '../actions/actionTypes';
import { IXBaseAdvert } from '../../utils/xbaseInterface.d';
import { fLog } from '../../utils/utils';
let favoriteState = {
    isLoading: true,
    ids: [],
    adverts: [],
    nextIdsToFetch: [],
}
const PAGE_SIZE = 20;
const TAG = "favorite";
export const favoriteReducer = (state = favoriteState, action: any) => {
    let nextIdsToFetch: string[] = [];
    switch (action.type) {
        case actionTypes.ADD_LOCAL_FAVORITE:
            return {
                ...state,
                ids: [action.advert._id, ...state.ids],
                adverts: [action.advert, ...state.adverts],
            };
        case actionTypes.REMOVE_LOCAL_FAVORITE:
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
        case actionTypes.REMOVE_ALL_FAVORITE_ON_LOGOUT:
            return { ...favoriteState, isLoading: false };
        case actionTypes.FAVORITE_IDS_SUCCESS:
            nextIdsToFetch = action.ids.slice(0, PAGE_SIZE)
            fLog("favorite", 'FAVORITE_IDS_SUCCESS action.ids = ', action.ids);
            return {
                ...state,
                ids: action.ids,
                adverts: [],
                nextIdsToFetch,
                isLoading: nextIdsToFetch.length > 0
            };
        case actionTypes.FAVORITE_ADVERTS:
            return { ...state, nextIdsToFetch: [] };
        case actionTypes.FAVORITE_ADVERTS_SUCCESS:
            fLog(TAG, 'FAVORITE_ADVERTS_SUCCESS',);
            let adverts = [...state.adverts, ...action.adverts];
            if (state.ids.length > adverts.length) {
                nextIdsToFetch = state.ids.slice(adverts.length, adverts.length + PAGE_SIZE)
            }
            return { ...state, adverts: adverts, nextIdsToFetch: nextIdsToFetch, isLoading: false };
        case actionTypes.FAVORITE_ADVERTS_ERROR:
            return { ...state, nextIdsToFetch: action.errorIds };
        default:
            return state;
    }
}