import { EXPANDING_POSTS, EXPANDED_POSTS, LAST_POST } from 'hkufui/src/constants/actionTypes';
import * as status from 'hkufui/src/constants/expandStatus';
import { login } from 'hkufui/config/webapi';

import { onLogin, onClear } from '../Login/authenticate';
import { onFill, retrievePosts } from './PostPreviewLoader/loadPosts';

async function invokeRetrieving(dispatch, getState) {
  const { credential, posts } = getState();

  try {
    const res = await retrievePosts(dispatch, getState);
    if (res.status === 200 || res.status === 204) {
      // successful return
      if (res.payload.length > 0) {
        dispatch(onFill(posts.posts.concat(res.payload)));
        dispatch(onExpanded());
      } else {
        dispatch(onLast());
      }
    } else {
      // failure
      switch(res.status) {
        case 408:
          // refresh token
          await dispatch(onLogin({
            credential: { username: credential.userId, passphrase: credential.passphrase },
            path: login.passphrase
          }));
          break;
        case 401:
          dispatch(onClear());
          break;
      }
      throw new Error();
    }
  } catch (error) {
    // try retrieve posts again
    invokeRetrieving(dispatch, getState);
  }
}

export function fetchExpansion() {
  return (dispatch, getState) => {
    dispatch(onExpanding());
    invokeRetrieving(dispatch, getState);
  };
}

export const onExpanding = () => ({
  type: EXPANDING_POSTS
});

export const onExpanded = () => ({
  type: EXPANDED_POSTS
});

export const onLast = () => ({
  type: LAST_POST
});

const handleExpandPosts = (state = {}, action = {}) => {
  switch (action.type) {
    case EXPANDING_POSTS:
      return {
        ...state,
        index: state.index + 1,
        subStatus: status.EXPANDING
      }
    case EXPANDED_POSTS:
      return {
        ...state,
        subStatus: status.BLAND
      }
    case LAST_POST:
      return {
        ...state,
        subStatus: status.HALT
      }
    default:
      return state;
  }
};

export default handleExpandPosts;
