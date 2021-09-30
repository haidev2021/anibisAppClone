import { actionTypes } from './actionTypes';
import { ILoginRequest, IAccountInfo } from '../../utils/xbaseInterface.d';
import { IOnError } from './action.d';

export const loginAction = (loginRequest: ILoginRequest | null, onError: IOnError) => {
    return {
        type: actionTypes.LOGIN,
        loginRequest,
        onError
    };
}

export const workerLoginAsyncSuccessAction = (accountInfo: IAccountInfo) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        accountInfo
    }
}

export const logoutAction = () => {
    return {
        type: actionTypes.LOGOUT,
    };
}

export const registerAction = (param: any, onError: IOnError) => {
    return {
        type: actionTypes.REGISTER,
        param,
        onError
    }
}