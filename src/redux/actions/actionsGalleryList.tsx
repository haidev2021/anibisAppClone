import { actionTypes } from './actionTypes';
import { IXBaseAdvert, IAdvertId } from '../../utils/xbaseInterface.d';
import { IOnError, IFetchAdvertsByIdsParam} from './action.d';

export const fetchGalleryIdsAction = (onError: IOnError) => {
    return {
        type: actionTypes.GALLERY_IDS,
        onError
    };
}
export const workerGalleryIdssyncSuccess = (ids: IAdvertId[]) => {
    return {
        type: actionTypes.GALLERY_ID_SUCCESS,
        ids
    }
}
export const fetchGalleryAdvertsAction = (param: IFetchAdvertsByIdsParam, onError: IOnError) => {
    return {
        type: actionTypes.GALLERY_ADVERTS,
        param,
        onError
    };
}
export const workerFetchGalleryAsyncSuccess = (adverts: IXBaseAdvert[]) => {
    return {
        type: actionTypes.GALLERY_ADVERT_SUCCESS,
        adverts,
    }
}
export const workerFetchGalleryAsyncError = (errorIds: IAdvertId[]) => {
    return {
        type: actionTypes.GALLERY_ADVERT_ERROR,
        errorIds,
    }
}
