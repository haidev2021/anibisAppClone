import { actionTypes } from '../actions/actionTypes';
import { IXBaseAdvert } from '../../utils/xbaseInterface.d';
let galleryListState = {
    isLoading: true,
    // isLoadingMore: false,
    ids: [],
    adverts: [],
    nextIdsToFetch: [],
}
const PAGE_SIZE = 20;
export const galleryListReducer = (state = galleryListState, action: any) => {
    let nextIdsToFetch: string[] = [];
    switch (action.type) {
        case actionTypes.GALLERY_ID_SUCCESS:
            nextIdsToFetch = action.ids.slice(0, PAGE_SIZE)
            return { ...state, ids: action.ids, adverts: [], nextIdsToFetch, isLoading: nextIdsToFetch.length > 0 };
        case actionTypes.GALLERY_ADVERTS:
            return { ...state, nextIdsToFetch: [] };
        case actionTypes.GALLERY_ADVERT_SUCCESS:
            let adverts = [...state.adverts, ...action.adverts];
            if (state.ids.length > adverts.length) {
                nextIdsToFetch = state.ids.slice(adverts.length, adverts.length + PAGE_SIZE)
            }
            return { ...state, adverts: adverts, nextIdsToFetch: nextIdsToFetch, isLoading: false};
        case actionTypes.GALLERY_ADVERT_ERROR:
            return { ...state, nextIdsToFetch: action.errorIds };
        default:
            return state;
    }
}