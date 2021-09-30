import { all, fork } from 'redux-saga/effects';
import { watchGallery, watchGalleryAdverts } from './galleryListSaga';
import { watchSearchCounts } from './searchCountSaga';
import { watchLocationSuggest } from './locationSuggestSaga';
import { watchSearchList} from './searchListSaga';
import { watchFavorite, watchAddLocalFavorite, watchRemoveLocalFavorite, watchFavoriteAdverts } from './favoriteSaga';
import { watchLogin, watchLoginSuccess, watchLogout } from './authenticationSaga';
import { watchHistoryIds, watchAddHistory, watchHistoryAdverts } from './historyListSaga';
import { watchUserListingList, watchUserListingListAdverts } from './userListingListSaga';
import { watchUploadImage } from './uploadImageSaga';
import { watchInsert, watchUpdateInsert } from './insertSaga';
import { watchInsertionList, watchInsertionListAdvertUpdate, watchInsertionListAdvertDelete, watchInsertionListAdvertPromote } from './insertionListSaga';
import { watchGetLanguage, watchSetLanguage } from './localizationSaga';

function* rootSaga() {
    yield all([
        fork(watchSetLanguage),
        fork(watchGetLanguage),
        fork(watchGallery),
        fork(watchGalleryAdverts),
        fork(watchSearchCounts),
        fork(watchLocationSuggest),
        fork(watchSearchList),
        fork(watchFavorite),
        fork(watchAddLocalFavorite),
        fork(watchRemoveLocalFavorite),
        fork(watchFavoriteAdverts),
        fork(watchLogin),
        fork(watchLoginSuccess),
        fork(watchLogout),
        fork(watchHistoryIds),
        fork(watchAddHistory),
        fork(watchHistoryAdverts),
        fork(watchUserListingList),
        fork(watchUserListingListAdverts),
        fork(watchUploadImage),
        fork(watchInsert),
        fork(watchUpdateInsert),
        fork(watchInsertionList),
        fork(watchInsertionListAdvertUpdate),
        fork(watchInsertionListAdvertDelete),
        fork(watchInsertionListAdvertPromote),
    ])
}
export default rootSaga;