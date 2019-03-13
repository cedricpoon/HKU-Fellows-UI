import { REQUEST_POST_CREATE, END_POST_CREATE } from 'hkufui/src/constants/actionTypes';
import { link, compose } from 'hkufui/config/webapi';
import { localize } from 'hkufui/locale';
import { LOADING, STILL } from 'hkufui/src/constants/loadStatus';

const locale = localize({ language: 'en', country: 'hk' });

export function onCompose({ payload, alert }) {
  return async (dispatch, getState) => {
    const { location, credential } = getState();
    const { courseId } = location;
    const { hashtag, ...restPayload } = payload;

    dispatch({ type: REQUEST_POST_CREATE });
    alert('Creating post...');
    try {
      const response = await fetch(link(compose.native({ courseId })), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credential.userId,
          token: credential.token,
          hashtag: hashtag && encodeURI(JSON.stringify(hashtag)),
          ...restPayload
        })
      });
      const res = await response.json();
      if (res.status !== 200) {
        // failure
        alert(`Post cannot be created ${res.status}`);
      }
    } catch (error) {
      // failure
      alert(`Post cannot be created`);
    }
    dispatch({ type: END_POST_CREATE });
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case REQUEST_POST_CREATE:
      return {
        status: LOADING
      };
    case END_POST_CREATE:
      return {
        status: STILL
      };
    default:
      return state;
  }
};
