
import { delay, takeEvery, takeLatest, put, call, select } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';
import { fLog } from '../../utils/utils';
import { workerHistoryListIdsAsyncSuccess, workerFetchHistoryListAsyncSuccess, workerFetchHistoryListAsyncError } from '../actions/actionHistoryList';

const TAG = "history"

export function* watchHistoryIds() {
    yield takeLatest(actionTypes.HISTORY_IDS, workerHistoryIdsAsync);
}

export function* workerHistoryIdsAsync(action: any) {
    let response, ids;
    try {
        response = yield call(service.getHistoryIds);
        ids = response ? JSON.parse(response) : []
        fLog(TAG, "workerHistoryAsync ids = " + ids);
        yield put(workerHistoryListIdsAsyncSuccess(ids));
    } catch (error) {
        fLog(TAG, "workerHistoryAsync error = " + error);
        action.onError(error);
    }
}

export function* watchAddHistory() {
    yield takeLatest(actionTypes.ADD_HISTORY_LIST_ITEM, workerAddHistoryAsync);
}

export function* workerAddHistoryAsync(action: any) {
    let idsJson, ids;
    try {
        idsJson = yield call(service.getHistoryIds);
        ids = idsJson ? JSON.parse(idsJson) : []
        fLog(TAG, "workerAddHistoryAsync ids before splice = " + ids);
        let foundIndex = ids.indexOf(action.advert._id);
        fLog(TAG, "workerAddHistoryAsync foundIndex = " + foundIndex);
        if (foundIndex >= 0)
            ids.splice(foundIndex, 1)
        fLog(TAG, "workerAddHistoryAsync ids after splice = " + ids);
        yield call(service.saveHistoryIds, [action.advert._id, ...ids]);
    } catch (error) {
        fLog(TAG, "workerAddHistoryAsync error = " + error);
        action.onError(error);
    }
}

export function* watchHistoryAdverts() {
    yield takeLatest(actionTypes.HISTORY_ADVERTS, workerHistoryAdvertsAsync);
}

export function* workerHistoryAdvertsAsync(action: any) {
    let response;
    try {
        response = yield call(service.fetchAdvertsByIds, action.param);
        fLog(TAG, "workerHistoryAdvertsAsync response = " + response);
        yield put(workerFetchHistoryListAsyncSuccess(response));
    } catch (error) {
        fLog(TAG, "workerHistoryAdvertsAsync error = " + error);
        action.onError(error);
        yield put(workerFetchHistoryListAsyncError(action.param));
    }
}