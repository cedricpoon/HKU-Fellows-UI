import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { persistStoreKey } from 'hkufui/config';

/* import all action handlers */
import {
  SelectCourseActionHandler
} from '../screens/reducers';

// global initial state
import initialState from './globalState';

const reducers = combineReducers({
  location: SelectCourseActionHandler
});

const persistedReducer = persistReducer({
  key: persistStoreKey,
  storage,
}, reducers);

export const store = createStore(
  persistedReducer,
  initialState,
  /* for react native inspector */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
