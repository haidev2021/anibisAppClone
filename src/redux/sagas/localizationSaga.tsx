
import { delay, takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';

const DEFAULT_LANGUAGE = "de";

export function* watchSetLanguage() {
    yield takeLatest(actionTypes.SET_LANGUAGE, workerSetLanguageAsync);
}

export function* workerSetLanguageAsync(action: any) {
    try {
        yield call(service.setLanguage, action.language);
        action.onSuccess();
    } catch (error) {
    }
}

export function* watchGetLanguage() {
    yield takeLatest(actionTypes.GET_LANGUAGE, workerGetLanguageAsync);
}

export function* workerGetLanguageAsync(action: any) {
    let language;
    try {
        language = yield call(service.getSetLanguage);
        action.onLanguageGet(language || DEFAULT_LANGUAGE);
    } catch (error) {
        action.onLanguageGet(DEFAULT_LANGUAGE);
    }
}