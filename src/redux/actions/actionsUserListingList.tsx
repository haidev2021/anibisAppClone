import { actionTypes } from './actionTypes';
import { IXBaseAdvert, IAdvertId } from '../../utils/xbaseInterface.d';
import { IOnError, IFetchAdvertsByIdsParam, IFetchUserListingListIdsParam, IOnSuccessNoContent } from './action.d';

export const resetUserListingListAction = () => {
    return {
        type: actionTypes.USER_LISTING_LIST_RESET,
    };
}

export const fetchUserListingListIdsAction = (param: IFetchUserListingListIdsParam, onError: IOnError) => {
    return {
        type: actionTypes.USER_LISTING_LIST_IDS,
        param,
        onError,
    };
}
export const workerUserListingListIdsAsyncSuccess = (ids: IAdvertId[]) => {
    return {
        type: actionTypes.USER_LISTING_LIST_IDS_SUCCESS,
        ids
    }
}
export const fetchUserListingListAdvertsAction = (param: IFetchAdvertsByIdsParam, onError: IOnError) => {
    return {
        type: actionTypes.USER_LISTING_LIST_ADVERTS,
        param,
        onError
    };
}
export const workerFetchUserListingListAsyncSuccess = (adverts: IXBaseAdvert[]) => {
    return {
        type: actionTypes.USER_LISTING_LIST_ADVERT_SUCCESS,
        adverts,
    }
}
export const workerFetchUserListingListAsyncError = (errorIds: IAdvertId[]) => {
    return {
        type: actionTypes.USER_LISTING_LIST_ADVERT_ERROR,
        errorIds,
    }
}
