import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {defaultReducer} from './reducers/defaultReducer';
import rootSaga from './sagas/rootSaga';
import { galleryListReducer } from './reducers/galleryListReducer';
import { searchListReducer } from './reducers/searchListReducer';
import { localizationReducer } from './reducers/localizationReducer';
import { favoriteReducer } from './reducers/favoriteReducer';
import { authenticationReducer } from './reducers/authenticationReducer';
import { historyListReducer } from './reducers/historyListReducer';
import { userListingListReducer } from './reducers/userListingListReducer';
import { insertionListReducer } from './reducers/insertionListReducer';

const sagaMiddleware = createSagaMiddleware();

// const rootReducer = combineReducers({defaultReducer});
const rootReducer = combineReducers({
    default: defaultReducer,
    galleryList: galleryListReducer,
    searchList: searchListReducer, 
    localization: localizationReducer,
    favorite: favoriteReducer,
    authentication: authenticationReducer,
    historyList: historyListReducer,
    userListingList: userListingListReducer,
    insertionList: insertionListReducer,
});
// const rootReducer = combineReducers({galleryListReducer});
const configureStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default configureStore;