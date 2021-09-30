
import { delay, takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';
import { workerFetchUserListingListAsyncSuccess, workerUserListingListIdsAsyncSuccess, workerFetchUserListingListAsyncError } from '../actions/actionsUserListingList';
import { IFetchUserListingListIdsParam, IInsertParam } from '../actions/action.d';
import { fLog } from '../../utils/utils';
import { workerInsertionListAdvertUpdateAsyncSuccess } from '../actions/actionsInsertionList';

const TAG = "insert"

export function* watchInsert() {
    yield takeEvery(actionTypes.INSERT, workerInsertAsync);
}

export function* workerInsertAsync(action: any) {
    const insertParam: IInsertParam = action.param as IInsertParam;
    try {
        fLog(TAG, "insertParam.advert = ", insertParam.advert)
        let response = yield call(service.insert, insertParam.advert);
        fLog(TAG, "response = ", response)
        insertParam.onSuccess(response.advert);
    } catch (error) {
        fLog(TAG, "catch error = " + error);
        insertParam.onError(error);
    }
}

export function* watchUpdateInsert() {
    yield takeEvery(actionTypes.UPDATE_INSERT, workerUpdateInsertAsync);
}

export function* workerUpdateInsertAsync(action: any) {
    try {
        let response = yield call(service.updateInsert, action.param);
        fLog(TAG, "response = ", response)
        action.onSuccess(response.advert);
        yield put(workerInsertionListAdvertUpdateAsyncSuccess(response.advert));
    } catch (error) {
        fLog(TAG, "catch error = " + error);
        action.onError(error);
    }
}