import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import { LOGOUT } from 'hkufui/src/constants/actionTypes';
import initState from 'hkufui/src/store/globalState';

import SelectCourseActionHandler from './SelectCourse/handleActions';

import LoadPostsHandler from './Preview/PostPreviewLoader/loadPosts';

import ExpandPostsHandler from './Preview/expandPosts';

import Authentication from './Login/authenticate';

const appReducer = combineReducers({
  location: SelectCourseActionHandler,
  posts: reduceReducers(
    LoadPostsHandler,
    ExpandPostsHandler
  ),
  credential: Authentication
});

// root reducer
export default (state, action) => {
  switch (action.type) {
    case LOGOUT:
      return initState; // clear store
    default:
      return appReducer(state, action);
  }
}
