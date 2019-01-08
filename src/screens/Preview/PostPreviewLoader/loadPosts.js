import { FILL_POSTS, LOAD_POSTS, LOAD_POSTS_FAILED } from "hkufui/src/constants/actionTypes";
import * as status from 'hkufui/src/constants/loadStatus';
import { BLAND } from 'hkufui/src/constants/expandStatus';
import { link, post } from 'hkufui/config/webapi';
import { login } from 'hkufui/config/webapi';

import { onLogin, onClear } from '../../Login/authenticate';

export async function retrievePosts(dispatch, getState) {
  const { location, credential, posts } = getState();

  const response = await fetch(link(post({
    code: location.courseId,
    index: posts.index ,
    time: posts.timeframe,
  })), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: credential.userId,
      token: credential.token,
      moodleKey: credential.moodleKey
    }),
  });
  const res = await response.json();
  return res;
}

async function invokeRetrieving(dispatch, getState) {
  const { credential } = getState();

  try {
    const res = await retrievePosts(dispatch, getState);
    if (res.status === 200 || res.status === 204) {
      // successful return
      if (credential) {
        dispatch(onFill(res.payload));
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
          // try retrieve posts again
          invokeRetrieving(dispatch, getState);
          break;
        case 401:
          dispatch(onClear());
          dispatch(onFail());
          break;
        default:
          dispatch(onFail());
      }
    }
  } catch (error) {
    dispatch(onFail());
  }
}

export function fetchPostsSafe(callforth) {
  return (dispatch, getState) => {
    const { posts } = getState();

    if (posts && posts.status !== status.LOADING) {
      if (callforth) {
        dispatch(callforth);
      }
      dispatch(fetchPosts());
    }
  };
}

export function fetchPosts() {
  return async (dispatch, getState) => {
    dispatch(onLoad());
    invokeRetrieving(dispatch, getState);
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
        subStatus: BLAND,
        posts: [],
        timeframe: Date.now(),
        index: 1
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
