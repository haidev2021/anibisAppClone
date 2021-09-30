import { actionTypes } from '../actions/actionTypes';
import { fLog } from '../../utils/utils';

let authenticationState = {
    email: "",
    memberSince: "",
    token: "",
    _id: "",
    role: "",
}
const TAG = "login"
export const authenticationReducer = (state = authenticationState, action: any) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            fLog(TAG, 'LOGIN_SUCCESS action.accountInfo = ', action.accountInfo);
            return { ...state, ...action.accountInfo }
        case actionTypes.LOGOUT:
            fLog(TAG, 'LOGOUT',);
            return authenticationState
        default:
            return state;
    }
}