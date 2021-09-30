import { actionTypes } from '../actions/actionTypes';
import { fLog } from '../../utils/utils';

let historyListState = {
    isLoading: true,
    ids: [],
    adverts: [],
    nextIdsToFetch: [],
}
const PAGE_SIZE = 20;
const TAG = "history"
export const historyListReducer = (state = historyListState, action: any) => {
    let nextIdsToFetch: string[] = [];
    switch (action.type) {
        case actionTypes.ADD_HISTORY_LIST_ITEM:
            const foundIndex = state.ids.indexOf(action.advert._id);
            const foundIndexInFetchList = state.nextIdsToFetch.indexOf(action.advert._id);
            if (foundIndex >= 0) {
                state.ids.splice(foundIndex, 1)
                state.adverts.splice(foundIndex, 1)
            }
            if (foundIndexInFetchList >= 0) {
                state.nextIdsToFetch.splice(foundIndexInFetchList, 1)
            }
            return {
                ...state,
                ids: [action.advert._id, ...state.ids],
                adverts: [action.advert, ...state.adverts],
                nextIdsToFetch: [...state.nextIdsToFetch],
            };
        case actionTypes.HISTORY_IDS_SUCCESS:
            nextIdsToFetch = action.ids.slice(0, PAGE_SIZE)
            fLog(TAG, 'HISTORY_IDS_SUCCESS action.ids = ', action.ids);
            fLog(TAG, 'HISTORY_IDS_SUCCESS nextIdsToFetch = ', nextIdsToFetch);
            return {
                ...state,
                ids: action.ids,
                adverts: [],
                nextIdsToFetch,
                isLoading: nextIdsToFetch.length > 0
            };
        case actionTypes.HISTORY_ADVERTS:
            return { ...state, nextIdsToFetch: [] };
        case actionTypes.HISTORY_ADVERTS_SUCCESS:
            fLog(TAG, 'HISTORY_ADVERTS_SUCCESS',);
            let adverts = [...state.adverts, ...action.adverts];
            if (state.ids.length > adverts.length) {
                nextIdsToFetch = state.ids.slice(adverts.length, adverts.length + PAGE_SIZE)
            }
            return { ...state, adverts: adverts, nextIdsToFetch: nextIdsToFetch, isLoading: false };
        case actionTypes.HISTORY_ADVERTS_ERROR:
            return { ...state, nextIdsToFetch: action.errorIds };
        default:
            return state;
    }
}