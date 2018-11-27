import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { persistStoreKey } from 'hkufui/config';

/* import all action handlers */
import {
  SelectCourseActionHandler,
  LoadPostsHandler
} from '../screens/reducers';

// global initial state
import initialState from './globalState';
import evaporating from './evaporating';

const reducers = combineReducers({
  location: SelectCourseActionHandler,
  posts: LoadPostsHandler
});

const persistedReducer = persistReducer({
  key: persistStoreKey,
  storage,
  blacklist: evaporating
}, reducers);

/* for react native inspector */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
