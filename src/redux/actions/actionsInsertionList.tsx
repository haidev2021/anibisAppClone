import { actionTypes } from './actionTypes';
import { IXBaseAdvert, IAdvertId, IInsertionUpdateParam, IInsertionDeleteParam, IInsertionPromoteParam } from '../../utils/xbaseInterface.d';
import { IOnError, IFetchAdvertsByIdsParam, IOnSuccessNoContent } from './action.d';

export const resetInsertionListAction = () => {
    return {
        type: actionTypes.INSERTION_LIST_RESET,
    };
}

export const fetchInsertionListIdsAction = (onError: IOnError) => {
    return {
        type: actionTypes.INSERTION_LIST_IDS,
        onError,
    };
}
export const workerInsertionListIdsAsyncSuccess = (ids: IAdvertId[]) => {
    return {
        type: actionTypes.INSERTION_LIST_IDS_SUCCESS,
        ids
    }
}
export const fetchInsertionListAdvertsAction = (param: IFetchAdvertsByIdsParam, onError: IOnError) => {
    return {
        type: actionTypes.INSERTION_LIST_ADVERTS,
        param,
        onError
    };
}
export const workerFetchInsertionListAdvertsAsyncSuccess = (adverts: IXBaseAdvert[]) => {
    return {
        type: actionTypes.INSERTION_LIST_ADVERTS_SUCCESS,
        adverts,
    }
}
export const workerFetchInsertionListAdvertsAsyncError = (errorIds: IAdvertId[]) => {
    return {
        type: actionTypes.INSERTION_LIST_ADVERTS_ERROR,
        errorIds,
    }
}

export const updateInsertionListAdvertAction= (param: IInsertionUpdateParam, onError: IOnError) => {
    return {
        type: actionTypes.INSERTION_LIST_ADVERT_UPDATE,
        param,
        onError,
    }
}

export const workerInsertionListAdvertUpdateAsyncSuccess = (advert: IXBaseAdvert) => {
    return {
        type: actionTypes.INSERTION_LIST_ADVERT_UPDATE_SUCCESS,
        advert,
    }
}

export const deleteInsertionListAdvertAction= (param: IInsertionDeleteParam, onError: IOnError) => {
    return {
        type: actionTypes.INSERTION_LIST_ADVERT_DELETE,
        param,
        onError,
    }
}

export const workerInsertionListAdvertDeleteAsyncSuccess = (id: IAdvertId) => {
    return {
        type: actionTypes.INSERTION_LIST_ADVERT_DELETE_SUCCESS,
        id,
    }
}

export const promoteInsertionListAdvertAction= (param: IInsertionPromoteParam, onError: IOnError, onSuccess: IOnSuccessNoContent) => {
    return {
        type: actionTypes.INSERTION_LIST_ADVERT_PROMOTE,
        param,
        onError,
        onSuccess,
    }
}
