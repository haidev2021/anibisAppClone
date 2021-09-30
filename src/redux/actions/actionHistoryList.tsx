import { actionTypes } from './actionTypes';
import { IXBaseAdvert, IAdvertId } from '../../utils/xbaseInterface.d';
import { IOnError, IFetchAdvertsByIdsParam } from './action.d';

export const addHistoryListItemAction = (advert: IXBaseAdvert) => {
    return {
        type: actionTypes.ADD_HISTORY_LIST_ITEM,
        advert,
    };
}

export const fetchHistoryListIdsAction = (onError: IOnError) => {
    return {
        type: actionTypes.HISTORY_IDS,
        onError,
    };
}
export const workerHistoryListIdsAsyncSuccess = (ids: IAdvertId[]) => {
    return {
        type: actionTypes.HISTORY_IDS_SUCCESS,
        ids
    }
}
export const fetchHistoryListAdvertsAction = (param: IFetchAdvertsByIdsParam, onError: IOnError) => {
    return {
        type: actionTypes.HISTORY_ADVERTS,
        param,
        onError
    };
}
export const workerFetchHistoryListAsyncSuccess = (adverts: IXBaseAdvert[]) => {
    return {
        type: actionTypes.HISTORY_ADVERTS_SUCCESS,
        adverts,
    }
}
export const workerFetchHistoryListAsyncError = (errorIds: IAdvertId[]) => {
    return {
        type: actionTypes.HISTORY_ADVERTS_ERROR,
        errorIds,
    }
}