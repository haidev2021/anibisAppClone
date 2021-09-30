
import { delay, takeEvery, takeLatest, put, call, take, race } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';
import { workerFetchSearchListAsyncSuccess, workerSearchListIdsAsyncSuccess, workerFetchSearchListAsyncError } from '../actions/actionsSearchList';
import { IFetchSearchListIdsParam } from '../actions/action.d';
import { fLog } from '../../utils/utils';

const TAG = "search"

export function* watchSearchList() {
    // yield takeLatest(actionTypes.SEARCH_LIST_IDS, workerSearchListAsync);
    while (true) {
        yield race({
            fetchIds: call(workerSearchListAsync),
            fetchAdverts: call(workerSearchListAdvertsAsync)
        })
    }
}

export function* workerSearchListAsync() {
    let action, response
    try {
        action = yield take(actionTypes.SEARCH_LIST_IDS)
        response = yield call(service.fetchSearchList, action.param as IFetchSearchListIdsParam);
        yield put(workerSearchListIdsAsyncSuccess(response));
    } catch (error) {
        fLog(TAG, "error = " + error);
        if (action)
            action.onError(error);
    }
}

// export function* watchSearchListAdverts() {
//     yield takeLatest(actionTypes.SEARCH_LIST_ADVERTS, workerSearchListAdvertsAsync);
// }

export function* workerSearchListAdvertsAsync() {
    let action, response
    while (true) {
        try {
            action = yield take(actionTypes.SEARCH_LIST_ADVERTS)
            response = yield call(service.fetchAdvertsByIds, action.param);
            yield put(workerFetchSearchListAsyncSuccess(response));
        } catch (error) {
            fLog(TAG, "error = " + error);
            if (action)
                action.onError(error);
            yield put(workerFetchSearchListAsyncError(action.param));
        }
    }
}