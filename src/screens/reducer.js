import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import SelectCourseActionHandler from './SelectCourse/handleActions';

import LoadPostsHandler from './Preview/PostPreviewLoader/loadPosts';

import ExpandPostsHandler from './Preview/expandPosts';

import Authentication from './Login/authenticate';

export default combineReducers({
  location: SelectCourseActionHandler,
  posts: reduceReducers(
    LoadPostsHandler,
    ExpandPostsHandler
  ),
  credential: Authentication
});
