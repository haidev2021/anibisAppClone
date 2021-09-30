
import { delay, takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';

export function* watchSearchCounts() {
    console.log("watchGallery");
    yield takeLatest(actionTypes.SEARCH_COUNT, workerSearchCountsAsync);
}

export function* workerSearchCountsAsync(action: any) {
    let response;
    try {
        response = yield call(service.fetchSearchCount, action.param);
        action.onSuccess(response);
    } catch (error) {
        console.log("error = " + error);
        action.onError(error);
    }
}