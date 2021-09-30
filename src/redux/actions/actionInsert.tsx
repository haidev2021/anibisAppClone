import { IInsertParam, IOnError, IOnAdvertSuccess } from "./action.d";
import { actionTypes } from "./actionTypes";
import { IInsertionUpdateParam } from "../../utils/xbaseInterface.d";

export const newInsertAction = (param: IInsertParam) => {
    return {
        type: actionTypes.INSERT,
        param,
    };
}

export const updateInsertAction = (param: IInsertionUpdateParam, onSuccess: IOnAdvertSuccess, onError: IOnError) => {
    return {
        type: actionTypes.UPDATE_INSERT,
        param,
        onSuccess,
        onError,
    };
}