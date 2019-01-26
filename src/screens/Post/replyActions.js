import { FILL_REPLIES, LOAD_REPLIES, REFRESH_REPLIES } from 'hkufui/src/constants/actionTypes';
import { OK, LOADING } from 'hkufui/src/constants/loadStatus';
import { localize } from 'hkufui/locale';

import MOCK_POSTS from 'hkufui/static/mock/posts';

const locale = localize({ language: 'en', country: 'hk' });

export function onClear() {
  return dispatch => {
    dispatch({ type: LOAD_REPLIES });
  }
}

export function onRefresh({ alert }) {
  return dispatch => {
    alert(locale['comment.refreshing']);
    dispatch({ type: REFRESH_REPLIES })
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
        alert(locale['comment.refreshed']);
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
