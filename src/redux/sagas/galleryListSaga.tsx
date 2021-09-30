
import { delay, takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';
import { workerFetchGalleryAsyncSuccess, workerGalleryIdssyncSuccess, workerFetchGalleryAsyncError } from '../actions/actionsGalleryList';
import { fLog } from '../../utils/utils';

const TAG = "gallery"

export function* watchGallery() {
    yield takeLatest(actionTypes.GALLERY_IDS, workerGalleryAsync);
}

export function* workerGalleryAsync(action: any) {
    let response;
    try {
        response = yield call(service.fetchGallery);
        yield put(workerGalleryIdssyncSuccess(response));
    } catch (error) {
        fLog(TAG, "error = " + error);
        action.onError(error);
    }
}

export function* watchGalleryAdverts() {
    yield takeLatest(actionTypes.GALLERY_ADVERTS, workerGalleryAdvertsAsync);
}

export function* workerGalleryAdvertsAsync(action: any) {
    let response;
    try {
        response = yield call(service.fetchAdvertsByIds, action.param);
        yield put(workerFetchGalleryAsyncSuccess(response));
    } catch (error) {
        fLog(TAG, "error = " + error);
        action.onError(error);
        yield put(workerFetchGalleryAsyncError(action.param));
    }
}