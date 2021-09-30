import { actionTypes } from './actionTypes';
import { IXBaseAdvert, IAdvertId } from '../../utils/xbaseInterface.d';
import { IOnError, IFetchAdvertsByIdsParam } from './action.d';

export const addLocalFavoriteAction = (advert: IXBaseAdvert, onError: IOnError) => {
    return {
        type: actionTypes.ADD_LOCAL_FAVORITE,
        advert,
        onError,
    };
}
export const removeLocalFavoriteAction = (id: IAdvertId, onError: IOnError) => {
    return {
        type: actionTypes.REMOVE_LOCAL_FAVORITE,
        id,
        onError,
    };
}
export const removeAllFavoriteOnLogoutAction = () => {
    return {
        type: actionTypes.REMOVE_ALL_FAVORITE_ON_LOGOUT,
    };
}

export const fetchFavoriteIdsAction = (onError: IOnError) => {
    return {
        type: actionTypes.FAVORITE_IDS,
        onError,
    };
}
export const workerFavoriteIdssyncSuccess = (ids: IAdvertId[]) => {
    return {
        type: actionTypes.FAVORITE_IDS_SUCCESS,
        ids
    }
}
export const fetchFavoriteAdvertsAction = (param: IFetchAdvertsByIdsParam, onError: IOnError) => {
    return {
        type: actionTypes.FAVORITE_ADVERTS,
        param,
        onError
    };
}
export const workerFetchFavoriteAsyncSuccess = (adverts: IXBaseAdvert[]) => {
    return {
        type: actionTypes.FAVORITE_ADVERTS_SUCCESS,
        adverts,
    }
}
export const workerFetchFavoriteAsyncError = (errorIds: IAdvertId[]) => {
    return {
        type: actionTypes.FAVORITE_ADVERTS_ERROR,
        errorIds,
    }
}
