import { actionTypes } from '../actions/actionTypes';
let localizationState = {
    language: 'de',
    texts: new Map(),
}
export const localizationReducer = (state = localizationState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_TEXTS:
            return {state, language: action.param.language, texts: action.param.texts}
        default:
            return state;
    }
}