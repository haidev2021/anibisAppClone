import { actionTypes } from './actionTypes';
import { IXBaseAdvert, IAdvertId } from '../../utils/xbaseInterface.d';
import { IOnError, IFetchLocationSuggestParam, IOnLocationSuggestSuccess} from './action.d';


export const fetchLocationSuggestAction = (param: IFetchLocationSuggestParam, onSuccess: IOnLocationSuggestSuccess, onError: IOnError) => {
    return {
        type: actionTypes.LOCATION_SUGGEST,
        param,
        onSuccess,
        onError
    };
}
