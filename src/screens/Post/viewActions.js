import {
  FILL_REPLIES,
  LOAD_REPLIES,
  REFRESH_REPLIES
} from 'hkufui/src/constants/actionTypes';
import { Alert } from 'react-native';
import { OK, LOADING } from 'hkufui/src/constants/loadStatus';
import { localize } from 'hkufui/locale';

import MOCK_POSTS from 'hkufui/static/mock/posts';

const locale = localize({ language: 'en', country: 'hk' });

/* eslint-disable */

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

export function onLoad({ id, alert }) {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: FILL_REPLIES,
        payload: { replies: MOCK_POSTS }
      });
      if (alert) {
        alert(locale['replies.refreshed']);
      }
    }, 3000);
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case FILL_REPLIES:
      return {
        ...state,
        replies: action.payload.replies,
        status: OK
      };
    case LOAD_REPLIES:
      return {
        ...state,
        replies: null,
        status: LOADING
      }
    case REFRESH_REPLIES:
      return {
        ...state,
        status: LOADING
      }
    default:
      return state;
  }
};