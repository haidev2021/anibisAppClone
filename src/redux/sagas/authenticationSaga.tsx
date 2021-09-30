
import { delay, takeEvery, takeLatest, put, call, select } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';
import { workerLoginAsyncSuccessAction } from '../actions/actionsAuthentication';
import { ILoginRequest, IAccountInfo } from '../../utils/xbaseInterface.d';
import { fLog } from '../../utils/utils';
import { useSelector } from 'react-redux';
import { removeAllFavoriteOnLogoutAction, fetchFavoriteIdsAction } from '../actions/actionsFavorite';
import { fetchInsertionListIdsAction } from '../actions/actionsInsertionList';
const TAG = "login"
export function* watchLogin() {
    fLog(TAG, 'watchLogin');
    yield takeLatest(actionTypes.LOGIN, workerLoginAsync);
}

export function* workerLoginAsync(action: any) {
    fLog(TAG, 'workerLoginAsync');
    let response, accountInfo;
    try {
        response = yield call(service.login, action.loginRequest as ILoginRequest);
        fLog(TAG, "workerLoginAsync response = " + response);
        if (!action.loginRequest)
            accountInfo = JSON.parse(response);
        else
            accountInfo = response.loginInfo;
        if (accountInfo)
            yield put(workerLoginAsyncSuccessAction(accountInfo as IAccountInfo));
        else
            yield put(fetchFavoriteIdsAction((message: string) => { }))
    } catch (error) {
        fLog(TAG, "error = " + error);
        action.onError(error);
    }
}
export function* watchLoginSuccess() {
    fLog(TAG, 'watchLoginSuccess');
    yield takeLatest(actionTypes.LOGIN_SUCCESS, workerLoginSuccessAsync);
}

export function* workerLoginSuccessAsync(action: any) {
    fLog(TAG, "workerLoginSuccessAsync action.accountInfo = " + action.accountInfo);
    let localFavoriteIds = yield select((state) => state.favorite.ids);
    fLog(TAG, 'workerLoginSuccessAsync localFavoriteIds = ', localFavoriteIds);
    try {
        yield call(service.saveAccountInfo, action.accountInfo);
        yield call(service.syncLocalFavorite, localFavoriteIds);
        yield call(service.removeLocalFavorites);
        yield put(fetchFavoriteIdsAction((message: string) => { }))
        yield put(fetchInsertionListIdsAction((message: string) =>{}))
    } catch (error) {
        fLog(TAG, "error = " + error);
    }
}

export function* watchLogout() {
    fLog(TAG, 'watchLogin');
    yield takeLatest(actionTypes.LOGOUT, workerLogoutAsync);
}

export function* workerLogoutAsync(action: any) {
    fLog(TAG, "workerLogoutAsync");
    try {
        yield call(service.deleteAccountInfo);
        yield put(removeAllFavoriteOnLogoutAction());
    } catch (error) {
        fLog(TAG, "workerLogoutAsync error = " + error);
    }
}