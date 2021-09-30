
import { delay, takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';
import { workerFetchUserListingListAsyncSuccess, workerUserListingListIdsAsyncSuccess, workerFetchUserListingListAsyncError } from '../actions/actionsUserListingList';
import { IFetchUserListingListIdsParam, IUploadImageParam } from '../actions/action.d';
import { fLog } from '../../utils/utils';

const TAG = "image"

export function* watchUploadImage() {
    yield takeEvery(actionTypes.UPLOAD_IMAGE, workerUploadImageAsync);
}

export function* workerUploadImageAsync(action: any) {
    try {
        yield call(service.uploadImage, action.param as IUploadImageParam);
    } catch (error) {
        fLog(TAG, "catch error = " + error);
        action.param.onError(error);
    }
}