import { actionTypes } from './actionTypes';
import { IGetTextsParam, IOnLanguageGet, IOnSuccessNoContent,  } from './action.d';

export const getLanguageAction = (onLanguageGet: IOnLanguageGet) => {
    return {
        type: actionTypes.GET_LANGUAGE,
        onLanguageGet,
    };
}

export const setLanguageAction = (language: string, onSuccess: IOnSuccessNoContent) => {
    return {
        type: actionTypes.SET_LANGUAGE,
        language,
        onSuccess,
    };
}

export const getTextsAction = (param: IGetTextsParam) => {
    return {
        type: actionTypes.GET_TEXTS,
        param
    };
}