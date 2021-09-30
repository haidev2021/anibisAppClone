
import { delay, takeEvery, takeLatest, put, call, select } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';
import { workerFetchFavoriteAsyncSuccess, workerFavoriteIdssyncSuccess, workerFetchFavoriteAsyncError } from '../actions/actionsFavorite';
import { fLog } from '../../utils/utils';
import { isAuthorized } from '../../utils/network';

const TAG = "favorite"

export function* watchFavorite() {
    yield takeLatest(actionTypes.FAVORITE_IDS, workerFavoriteAsync);
}

export function* workerFavoriteAsync(action: any) {
    let response, ids;
    try {
        response = yield call(service.fetchFavorite);
        ids = !isAuthorized() ? (response ? JSON.parse(response) : []) : response;
        fLog(TAG, "workerFavoriteAsync ids = " + ids);
        yield put(workerFavoriteIdssyncSuccess(ids));
    } catch (error) {
        fLog(TAG, "workerFavoriteAsync error = " + error);
        action.onError(error);
    }
}

export function* watchAddLocalFavorite() {
    yield takeLatest(actionTypes.ADD_LOCAL_FAVORITE, workerAddLocalFavoriteAsync);
}

export function* workerAddLocalFavoriteAsync(action: any) {
    let idsJson, ids;
    try {
        if (isAuthorized()) {
            yield call(service.addSyncedFavorite, action.advert._id);
        }
        else {
            idsJson = yield call(service.getLocalFavorites);
            ids = idsJson ? JSON.parse(idsJson) : []
            yield call(service.saveLocalFavorites, [action.advert._id, ...ids]);
        }
    } catch (error) {
        fLog(TAG, "workerAddLocalFavoriteAsync error = " + error);
        action.onError(error);
    }
}

export function* watchRemoveLocalFavorite() {
    yield takeLatest(actionTypes.REMOVE_LOCAL_FAVORITE, workerRemoveLocalFavoriteAsync);
}

export function* workerRemoveLocalFavoriteAsync(action: any) {
    let idsJson, ids;
    try {
        if (isAuthorized()) {
            yield call(service.removeSyncedFavorite, action.advert._id);
        }
        else {
            idsJson = yield call(service.getLocalFavorites);
            ids = idsJson ? JSON.parse(idsJson) : []
            let foundIndex = ids.indexOf(action.id);
            if (foundIndex >= 0)
                ids.splice(foundIndex, 1)
            yield call(service.saveLocalFavorites, ids);
        }
    } catch (error) {
        fLog(TAG, "workerRemoveLocalFavoriteAsync error = " + error);
        action.onError(error);
    }
}

export function* watchFavoriteAdverts() {
    yield takeLatest(actionTypes.FAVORITE_ADVERTS, workerFavoriteAdvertsAsync);
}

export function* workerFavoriteAdvertsAsync(action: any) {
    let response;
    try {
        response = yield call(service.fetchAdvertsByIds, action.param);
        yield put(workerFetchFavoriteAsyncSuccess(response));
    } catch (error) {
        fLog(TAG, "workerFavoriteAdvertsAsync error = " + error);
        action.onError(error);
        yield put(workerFetchFavoriteAsyncError(action.param));
    }
}