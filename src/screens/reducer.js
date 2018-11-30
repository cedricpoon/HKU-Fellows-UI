import { combineReducers } from 'redux';

import SelectCourseActionHandler from './SelectCourse/handleActions';

import LoadPostsHandler from './Preview/PostPreviewLoader/loadPosts';

export default combineReducers({
  location: SelectCourseActionHandler,
  posts: LoadPostsHandler
});
