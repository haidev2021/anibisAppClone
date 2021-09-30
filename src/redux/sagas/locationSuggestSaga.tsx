
import { delay, takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import * as service from '../services/services';

function toTitleCase(str: string): string {
    return str.split(' ')
        .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(' ')
}

export function* watchLocationSuggest() {
    console.log("watchGallery");
    yield takeLatest(actionTypes.LOCATION_SUGGEST, workerLocationSuggestAsync);
}

export function* workerLocationSuggestAsync(action: any) {
    let response;
    try {
        response = yield call(service.fetchLocationSuggest, action.param);
        console.log(`POST /locationSuggestion RESPONSE = `, response);
        let fixedCaseList: Array<string> = [];
        if (response)
            fixedCaseList = Array.from(response, (item: string) => toTitleCase(item));
        action.onSuccess(fixedCaseList);
    } catch (error) {
        console.log("error = " + error);
        action.onError(error);
    }
}