import { SERVER, ADVERT_GALLERY_API, POST_HEADERS, ADVERT_SEARCH_RESULT_API, ADVERT_SEARCH_COUNT_API, ADVERT_DETAILS_BY_IDS_API, GET_HEADERS, XBASE_LOCATION_SUGGESTION_API, ADVERT_SEARCH_API, ADVERT_FAVORITE_IDS_API, USER_SIGNIN_API, USER_FAVORITE_LOCAL_SYNC_API, setAuthorizationToken, setAuthorizationTokenHeader, removeAuthorizationTokenHeader, isAuthorized, USER_FAVORITE_ADD_REMOVE_API, ADVERT_USER_ADVERTS_API, IMAGE_UPLOAD_API, ADVERT_INSERT_API, ADVERT_MY_ADVERT_IDS_API, ADVERT_MY_LISTING_IDS_API, ADVERT_UPDATE_ADVERT_API, ADVERT_DELETE_API, ADVERT_PROMOTE_API } from "../../utils/network";

import queryString from 'query-string';
import { IFetchSearchListIdsParam, IFetchUserListingListIdsParam, IUploadImageParam } from "../actions/action.d";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fLog } from "../../utils/utils";
import { ILoginRequest, IAccountInfo, IAdvertId, EFavoriteSyncAction, IXBaseAdvert, IInsertionUpdateParam, IInsertionDeleteParam, IInsertionPromoteParam } from "../../utils/xbaseInterface.d";
var RNFS = require('react-native-fs');
const TAG = "service"

const anibisPost = (api: string, param: any) => {
  fLog(TAG, "SEARCH fetchSearchList anibisPost");
  fLog(TAG, "SEARCH fetchSearchList anibisPost param = " + JSON.stringify(param), "SERVER + api = ", SERVER + api);
  return fetch(SERVER + api, {
    ...POST_HEADERS,
    body: JSON.stringify(param),
  })
    .then(res => res.json())
    .then(rj => rj)
    .catch(error => console.warn({ reportError: error }));
};

const anibisGet = (api: string, param: any) => {
  const url = `${SERVER}${api}?${queryString.stringify(param)}`;
  fLog(TAG, `anibisGet url = `, url)
  return fetch(url, {
    ...GET_HEADERS,
  })
    .then(res => res.json())
    .then(rj => rj)
    .catch(error => console.warn({ reportError: error }));
};

export const getSetLanguage = () => {
  return AsyncStorage.getItem('@language_key')
}

export const setLanguage = (language: string) => {
  return AsyncStorage.setItem('@language_key', language)
}

export const fetchGallery = () => {
  return anibisPost(ADVERT_GALLERY_API, { lng: "de" });
};

export const fetchSearchList = (param: IFetchSearchListIdsParam) => {
  fLog(TAG, "SEARCH fetchSearchList param 1 = " + JSON.stringify(param));
  let result = anibisPost(ADVERT_SEARCH_API, param);
  fLog(TAG, "SEARCH fetchSearchList param 2 = " + JSON.stringify(param));
  return result;
};

export const fetchAdvertsByIds = (param: any) => {
  fLog(TAG, "fetchAdvertsByIds param = " + JSON.stringify(param));
  return anibisPost(ADVERT_DETAILS_BY_IDS_API, param);
};

export const fetchSearchCount = (param: any) => {
  fLog(TAG, "fetchSearchCount param = " + JSON.stringify(param));
  return anibisPost(ADVERT_SEARCH_COUNT_API, param);
};

export const fetchLocationSuggest = (param: any) => {
  fLog(TAG, "fetchSearchCount param = " + JSON.stringify(param));
  return anibisGet(XBASE_LOCATION_SUGGESTION_API, param);
};

export const fetchFavorite = () => {
  fLog("favorite", 'fetchFavorite = isAuthorized()', isAuthorized());
  if (isAuthorized())
    return anibisPost(ADVERT_FAVORITE_IDS_API, { lng: "de" });
  else
    return getLocalFavorites()
};

export const getLocalFavorites = () => {
  return AsyncStorage.getItem('@favorite_ids_key')
};

export const saveLocalFavorites = (ids: any) => {
  return AsyncStorage.setItem('@favorite_ids_key', JSON.stringify(ids))
};
export const addSyncedFavorite = (id: IAdvertId) => {
  return anibisPost(USER_FAVORITE_ADD_REMOVE_API, { id, action: EFavoriteSyncAction.FAVORITE_ADD });
}

export const removeLocalFavorites = () => {
  return AsyncStorage.removeItem('@favorite_ids_key')
};

export const removeSyncedFavorite = (id: IAdvertId) => {
  return anibisPost(USER_FAVORITE_ADD_REMOVE_API, { id, action: EFavoriteSyncAction.FAVORITE_DELETE });
}

export const login = (loginRequest: ILoginRequest) => {
  fLog("login", 'login loginRequest = ', JSON.stringify(loginRequest));
  if (loginRequest)
    return anibisPost(USER_SIGNIN_API, loginRequest);
  else
    return AsyncStorage.getItem('@account_info_key')
};

export const saveAccountInfo = (accountInfo: IAccountInfo) => {
  setAuthorizationTokenHeader(accountInfo.token);
  return AsyncStorage.setItem('@account_info_key', JSON.stringify(accountInfo))
};

export const deleteAccountInfo = () => {
  removeAuthorizationTokenHeader();
  return AsyncStorage.removeItem('@account_info_key')
};

export const syncLocalFavorite = (favoriteIds: IAdvertId[]) => {
  return anibisPost(USER_FAVORITE_LOCAL_SYNC_API, { favoriteIds });
}

export const getHistoryIds = () => {
  return AsyncStorage.getItem('@history_ids_key')
};

export const saveHistoryIds = (ids: any) => {
  return AsyncStorage.setItem('@history_ids_key', JSON.stringify(ids))
};

export const fetchUserListingList = (param: IFetchUserListingListIdsParam) => {
  let result = anibisPost(ADVERT_USER_ADVERTS_API, param);
  return result;
};

export const uploadImage = (param: IUploadImageParam) => {
  RNFS.uploadFiles({
    toUrl: SERVER + IMAGE_UPLOAD_API,
    files: [param.file],
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    begin: param.uploadBeginCb,
    progress: param.uploadProgressCb
  }).promise.then((response: any) => {
    fLog(TAG, 'UPLOAD response = ', response);
    if (response.statusCode == 200) {
      fLog(TAG, 'FILES UPLOADED!');
      let body = JSON.parse(response.body);
      param.onSuccess({...body, jobId: response.jobId})
    } else {
      param.onError('SERVER ERROR')
    }
  }).catch((err: any) => {
      param.onError(err)
    });
}

export const insert = (advert: IXBaseAdvert) => {
  return anibisPost(ADVERT_INSERT_API, advert);
};

export const updateInsert = (param: IInsertionUpdateParam) => {
  return anibisPost(ADVERT_UPDATE_ADVERT_API, param);
};

export const fetchInsertionList = () => {
  return anibisPost(ADVERT_MY_LISTING_IDS_API, {});
};

export const updateInsertion = (param: IInsertionUpdateParam) => {
  return anibisPost(ADVERT_UPDATE_ADVERT_API, param);
};

export const deleteInsertion = (param: IInsertionDeleteParam) => {
  return anibisPost(ADVERT_DELETE_API, param);
};

export const promoteInsertion = (param: IInsertionPromoteParam) => {
  return anibisPost(ADVERT_PROMOTE_API, param);
};


