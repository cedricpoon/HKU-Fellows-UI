import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import { LOGOUT } from 'hkufui/src/constants/actionTypes';
import initState from 'hkufui/src/store/globalState';

import SelectCourseActionHandler from './SelectCourse/handleActions';
import LoadPostsHandler from './Preview/PostPreviewLoader/loadPosts';
import ExpandPostsHandler from './Preview/expandPosts';
import Authentication from './Login/authenticate';
import ViewActionHandler from './Post/viewActions';
import SetTopicActionHandler from './Post/setTopicActions';
import FilterPostHandler from './Preview/filterPosts';
import DrawerActionHandler from '../navigator/Context/DrawerMenu/drawerAction';
import ComposeActionHandler from './ComposePreview/createActions';

const ruleReducer = (state, action) => {
  // logged in rule middleware
  const loggedIn = (handleAction) => {
    return (innerState = {}, innerAction = {}) => {
      if (state.credential) {
        return handleAction(innerState, innerAction);
      } else {
        // state unchanged
        return innerState;
      }
    };
  };

  // main application reducers
  const appReducer = combineReducers({
    location: loggedIn(reduceReducers(
      SelectCourseActionHandler,
      SetTopicActionHandler
    )),
    posts: loggedIn(reduceReducers(
      LoadPostsHandler,
      ExpandPostsHandler,
      FilterPostHandler
    )),
    replies: loggedIn(ViewActionHandler),
    credential: Authentication,
    profile: loggedIn(DrawerActionHandler),
    compose: loggedIn(ComposeActionHandler)
  });

  return appReducer(state, action);
};

// root reducer
export default (state, action) => {
  switch (action.type) {
    case LOGOUT:
      return initState; // clear store
    default:
      return ruleReducer(state, action);
  }
}
