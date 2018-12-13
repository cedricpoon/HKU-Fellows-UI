import { EXPANDING_POSTS, EXPANDED_POSTS, LAST_POST } from 'hkufui/src/constants/actionTypes';
import { onFill } from './PostPreviewLoader/loadPosts';
import * as status from 'hkufui/src/constants/expandStatus';

import getPosts from 'hkufui/mock/public/posts';

export function fetchExpansion() {
  const latency = Math.floor(Math.random() * 5 + 1) * 200;
  const last = Math.floor(Math.random() * 50 + 1) === 50;

  return (dispatch, getState) => {
    dispatch(onExpanding());

    // mocking of fetch from WebAPI
    setTimeout(() => {
      const { posts } = getState();

      // check if modifying postList (Reloading page, navigating location etc.)
      if (posts.subStatus !== status.BLAND) {
        if (!last) {
          dispatch(onFill(posts.posts.concat(getPosts())));
          dispatch(onExpanded());
        } else {
          dispatch(onLast());
        }
      }
    }, latency);
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
