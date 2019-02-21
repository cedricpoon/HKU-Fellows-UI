import {
  FILL_REPLIES,
  LOAD_REPLIES,
  REFRESH_REPLIES,
  LOAD_REPLIES_FAILED
} from 'hkufui/src/constants/actionTypes';
import { Alert } from 'react-native';
import { OK, LOADING, FAIL } from 'hkufui/src/constants/loadStatus';
import { localize } from 'hkufui/locale';
import { link, view, login } from 'hkufui/config/webapi';
import defaultState from 'hkufui/src/store/globalState';

import { onLogin } from '../Login/authenticate';

const locale = localize({ language: 'en', country: 'hk' });

export function onClear() {
  return dispatch => {
    dispatch({ type: LOAD_REPLIES });
  }
}

export function onRefresh({ alert }) {
  return dispatch => {
    alert(locale['replies.refreshing']);
    dispatch({ type: REFRESH_REPLIES })
  }
}

export function onVote({ topicId, postId, value }) {
  return dispatch => {
    Alert.alert('onVote');
    dispatch({ type: REFRESH_REPLIES });
    dispatch(onLoad({ id: topicId }));
  }
}

export function onNotify({ topicId }) {
  return dispatch => {
    Alert.alert('onNotify');
  }
}

export function onAccept({ topicId, postId }) {
  return dispatch => {
    Alert.alert('onAccept');
    dispatch({ type: REFRESH_REPLIES });
    dispatch(onLoad({ id: topicId }));
  }
}

async function fetchPost(id, credential) {
  const response = await fetch(link(view({ topicId: id })), {
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
  return await response.json();
}

export function onLoad({ id, alert }) {
  return async (dispatch, getState) => {
    const { credential } = getState();

    try {
      const res = await fetchPost(id, credential);
      if (res.status === 200) {
        const { posts, native: _native, ...restPayload } = res.payload;
        const native = _native === 1;
        // success
        dispatch({
          type: FILL_REPLIES,
          payload: { replies: posts, topicInfo: { native, ...restPayload } }
        });
        if (alert) {
          alert(locale['replies.refreshed']);
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
            dispatch(onLoad({ id, alert }));
            break;
          default:
            dispatch({ type: LOAD_REPLIES_FAILED });
        }
      }
    } catch (error) {
      dispatch({ type: LOAD_REPLIES_FAILED });
    }
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case FILL_REPLIES:
      return {
        ...state,
        ...action.payload,
        status: OK
      };
    case LOAD_REPLIES:
      return {
        ...state,
        replies: null,
        topicInfo: defaultState.replies.topicInfo,
        status: LOADING
      }
    case REFRESH_REPLIES:
      return {
        ...state,
        status: LOADING
      }
    case LOAD_REPLIES_FAILED:
      return {
        ...state,
        status: FAIL
      }
    default:
      return state;
  }
};
