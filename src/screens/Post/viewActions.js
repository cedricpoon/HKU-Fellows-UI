import {
  FILL_REPLIES,
  LOAD_REPLIES,
  REFRESH_REPLIES,
  LOAD_REPLIES_FAILED
} from 'hkufui/src/constants/actionTypes';
import { Alert } from 'react-native';
import { OK, LOADING, FAIL } from 'hkufui/src/constants/loadStatus';
import { localize } from 'hkufui/locale';
import { link, view, login, vote } from 'hkufui/config/webapi';
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

async function fetchPost({ credential, path, isMoodleKey, payload }) {
  const response = await fetch(link(path), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: credential.userId,
      token: credential.token,
      ...(isMoodleKey && { moodleKey: credential.moodleKey }),
      ...payload
    }),
  });
  return await response.json();
}

export function onVote({ topicId, postId, value, alert }) {
  return async (dispatch, getState) => {
    const { credential } = getState();
    // +1 -> vote up / -1 -> vote down
    const votePath = value > 0 ? vote.up({ postId }) : vote.down({ postId })
    try {
      const res = await fetchPost({ credential, path: votePath });
      if (res.status === 200) {
        // Successfully voted
        dispatch({ type: REFRESH_REPLIES });
        dispatch(onLoad({ id: topicId }));
      } else {
        // failure
        switch(res.status) {
          case 409:
            alert(locale['replies.voted']);
            break;
          case 410:
            alert(locale['replies.selfVote']);
            break;
          default:
            alert(`${locale['replies.voteIssue']} ${res.status}`);
            break;
        }
      }
    } catch (error) {
      alert(locale['replies.voteIssue']);
    }
  }
}

export function onNotify({ topicId }) { // eslint-disable-line
  return dispatch => { // eslint-disable-line
    Alert.alert('onNotify');
  }
}

export function onAccept({ topicId, postId, alert }) {
  return async (dispatch, getState) => {
    const { credential } = getState();
    try {
      const res = await fetchPost({ credential, path: view.adopt({ topicId }), payload: { postId } });
      if (res.status === 200) {
        // Successfully voted
        dispatch({ type: REFRESH_REPLIES });
        dispatch(onLoad({ id: topicId }));
      } else {
        // failure
        alert(`${locale['replies.acceptError']} ${res.status}`);
      }
    } catch (error) {
      alert(locale['replies.acceptError']);
    }
  }
}

export function onLoad({ id, alert }) {
  return async (dispatch, getState) => {
    const { credential } = getState();

    try {
      const res = await fetchPost({ credential, path: view.index({ topicId: id }), isMoodleKey: true });
      if (res.status === 200) {
        const { posts, native: _native, owned: _owned, ...restPayload } = res.payload;
        const native = _native === 1;
        const owned = _owned === 1;
        // success
        dispatch({
          type: FILL_REPLIES,
          payload: { replies: posts, topicInfo: { native, owned, ...restPayload } }
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
              path: login.passphrase()
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
