
import { delay, takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';
import { workerFetchUserListingListAsyncSuccess, workerUserListingListIdsAsyncSuccess, workerFetchUserListingListAsyncError } from '../actions/actionsUserListingList';
import { IFetchUserListingListIdsParam } from '../actions/action.d';
import { fLog } from '../../utils/utils';

const TAG = "search"

export function* watchUserListingList() {
    yield takeLatest(actionTypes.USER_LISTING_LIST_IDS, workerUserListingListAsync);
}

export function* workerUserListingListAsync(action: any) {
    let response;
    try {
        response = yield call(service.fetchUserListingList, action.param as IFetchUserListingListIdsParam);
        fLog(TAG, `workerUserListingListAsync onError`, action.onError)
        yield put(workerUserListingListIdsAsyncSuccess(response));
    } catch (error) {
        fLog(TAG, "error = " + error);
        action.onError(error);
    }
}

export function* watchUserListingListAdverts() {
    yield takeLatest(actionTypes.USER_LISTING_LIST_ADVERTS, workerUserListingListAdvertsAsync);
}

export function* workerUserListingListAdvertsAsync(action: any) {
    let response;
    try {
        response = yield call(service.fetchAdvertsByIds, action.param);
        yield put(workerFetchUserListingListAsyncSuccess(response));
    } catch (error) {
        fLog(TAG, "error = " + error);
        action.onError(error);
        yield put(workerFetchUserListingListAsyncError(action.param));
    }
}