import { FILL_POSTS, LOAD_POSTS, LOAD_POSTS_FAILED } from "hkufui/src/constants/actionTypes";
import * as status from 'hkufui/src/constants/loadStatus';

import postList from 'hkufui/mock/public/posts';

export function fetchPostsSafe(callforth) {
  return (dispatch, getState) => {
    const { posts } = getState();
    if (posts && posts.status !== status.LOADING) {
      dispatch(callforth);
      dispatch(fetchPosts());
    }
  };
}

export function fetchPosts() {
  const latency = Math.floor(Math.random() * 5 + 1) * 1000;
  const failed = Math.floor(Math.random() * 5 + 1) === 5;
  const empty = Math.floor(Math.random() * 5 + 1) === 5;

  return (dispatch) => {
    dispatch(onLoad());

    // mocking of fetch from WebAPI
    setTimeout(() => {
      if (!failed)
        dispatch(onFill(empty ? [] : postList));
      else
        dispatch(onFail());
    }, latency);
  };
}

export const onFill = (posts) => ({
  type: FILL_POSTS,
  payload: {
    posts: posts
  }
});

export const onLoad = () => ({
  type: LOAD_POSTS
});

export const onFail = () => ({
  type: LOAD_POSTS_FAILED
});

const handleLoadPosts = (state = {}, action = {}) => {
  switch (action.type) {
    case FILL_POSTS:
      return {
        ...state,
        status: status.OK,
        posts: action.payload.posts
      }
    case LOAD_POSTS:
      return {
        ...state,
        status: status.LOADING,
        posts: []
      }
    case LOAD_POSTS_FAILED:
      return {
        ...state,
        status: status.FAIL,
        posts: []
      }
    default:
      return state;
  }
};

export default handleLoadPosts;
