
import { delay, takeEvery, takeLatest, put, call, take, race } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';
import { fLog } from '../../utils/utils';
import { workerInsertionListIdsAsyncSuccess, workerFetchInsertionListAdvertsAsyncSuccess, workerInsertionListAdvertUpdateAsyncSuccess, workerInsertionListAdvertDeleteAsyncSuccess } from '../actions/actionsInsertionList';

const TAG = "insertion"

export function* watchInsertionList() {
    // yield takeLatest(actionTypes.INSERTION_LIST_IDS, workerInsertionListAsync);
    while (true) {
        yield race({
            fetchIds: call(workerInsertionListAsync),
            fetchAdverts: call(workerInsertionListAdvertsAsync)
        })
    }
}

export function* workerInsertionListAsync() {
    let action, response
    try {
        action = yield take(actionTypes.INSERTION_LIST_IDS)
        response = yield call(service.fetchInsertionList);
        yield put(workerInsertionListIdsAsyncSuccess(response));
    } catch (error) {
        fLog(TAG, "error = " + error);
        if (action)
            action.onError(error);
    }
}

// export function* watchInsertionListAdverts() {
//     yield takeLatest(actionTypes.INSERTION_LIST_ADVERTS, workerInsertionListAdvertsAsync);
// }

export function* workerInsertionListAdvertsAsync() {
    let action, response
    while (true) {
        try {
            action = yield take(actionTypes.INSERTION_LIST_ADVERTS)
            response = yield call(service.fetchAdvertsByIds, action.param);
            yield put(workerFetchInsertionListAdvertsAsyncSuccess(response));
        } catch (error) {
            fLog(TAG, "error = " + error);
            if (action)
                action.onError(error);
            yield put(workerFetchInsertionListAdvertsAsyncSuccess(action.param));
        }
    }
}

export function* watchInsertionListAdvertUpdate() {
    yield takeLatest(actionTypes.INSERTION_LIST_ADVERT_UPDATE, workerInsertionListAdvertUpdateAsync);
}

export function* workerInsertionListAdvertUpdateAsync(action: any) {
    let response;
    try {
        response = yield call(service.updateInsertion, action.param);
        yield put(workerInsertionListAdvertUpdateAsyncSuccess(response.advert));
    } catch (error) {
        fLog(TAG, "workerFavoriteAdvertsAsync error = " + error);
        action.onError(error);
    }
}
export function* watchInsertionListAdvertDelete() {
    yield takeLatest(actionTypes.INSERTION_LIST_ADVERT_DELETE, workerInsertionListAdvertDeleteAsync);
}

export function* workerInsertionListAdvertDeleteAsync(action: any) {
    let response;
    try {
        response = yield call(service.deleteInsertion, action.param);
        yield put(workerInsertionListAdvertDeleteAsyncSuccess(action.param.id));
    } catch (error) {
        fLog(TAG, "workerFavoriteAdvertsAsync error = " + error);
        action.onError(error);
    }
}
export function* watchInsertionListAdvertPromote() {
    yield takeLatest(actionTypes.INSERTION_LIST_ADVERT_PROMOTE, workerInsertionListAdvertPromoteAsync);
}

export function* workerInsertionListAdvertPromoteAsync(action: any) {
    let response;
    try {
        response = yield call(service.promoteInsertion, action.param);
        action.onSuccess();
    } catch (error) {
        fLog(TAG, "workerFavoriteAdvertsAsync error = " + error);
        action.onError(error);
    }
}