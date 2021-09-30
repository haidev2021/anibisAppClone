import { actionTypes } from './actionTypes';
import { IXBaseAdvert } from '../../utils/xbaseInterface.d';
import { IOnSearchCountsSuccess, IFetchSearchCountsParam, IOnError} from './action.d';

export const fetchSearchCountsAction = (param: IFetchSearchCountsParam, onSuccess: IOnSearchCountsSuccess, onError: IOnError) => {
    return {
        type: actionTypes.SEARCH_COUNT,
        param,
        onSuccess,
        onError
    };
}