import { createStore, combineReducers } from "redux";

/* import all action handlers */
import {
  SelectCourseActionHandler
} from "../screens";

// global initial state
import initialState from './globalState';

const reducers = combineReducers({
  location: SelectCourseActionHandler
});

const store = createStore(
  reducers,
  initialState,
  /* for react native inspector */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
