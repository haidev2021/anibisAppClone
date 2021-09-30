import { actionTypes } from './actionTypes';
import { IXBaseAdvert, IAdvertId } from '../../utils/xbaseInterface.d';
import { IOnError, IFetchAdvertsByIdsParam, IFetchSearchListIdsParam, IOnSuccessNoContent } from './action.d';

export const resetSearchListAction = () => {
    return {
        type: actionTypes.SEARCH_LIST_RESET,
    };
}

export const fetchSearchListIdsAction = (param: IFetchSearchListIdsParam, onError: IOnError) => {
    return {
        type: actionTypes.SEARCH_LIST_IDS,
        param,
        onError,
    };
}
export const workerSearchListIdsAsyncSuccess = (ids: IAdvertId[]) => {
    return {
        type: actionTypes.SEARCH_LIST_IDS_SUCCESS,
        ids
    }
}
export const fetchSearchListAdvertsAction = (param: IFetchAdvertsByIdsParam, onError: IOnError) => {
    return {
        type: actionTypes.SEARCH_LIST_ADVERTS,
        param,
        onError
    };
}
export const workerFetchSearchListAsyncSuccess = (adverts: IXBaseAdvert[]) => {
    return {
        type: actionTypes.SEARCH_LIST_ADVERT_SUCCESS,
        adverts,
    }
}
export const workerFetchSearchListAsyncError = (errorIds: IAdvertId[]) => {
    return {
        type: actionTypes.SEARCH_LIST_ADVERT_ERROR,
        errorIds,
    }
}
