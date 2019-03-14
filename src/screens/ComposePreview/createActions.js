import { Linking } from 'react-native';
import { REQUEST_POST_CREATE, END_POST_CREATE } from 'hkufui/src/constants/actionTypes';
import { link, compose } from 'hkufui/config/webapi';
import { localize } from 'hkufui/locale';
import { LOADING, STILL } from 'hkufui/src/constants/loadStatus';
import NavigationService from 'hkufui/src/NavigationService';
import { deepLink } from 'hkufui/config';
import { encrypt } from 'hkufui/src/safe';

import { fetchPosts } from '../Preview/PostPreviewLoader/loadPosts';

const locale = localize({ language: 'en', country: 'hk' });

export function onCompose({ payload, alert }) {
  return async (dispatch, getState) => {
    const { location, credential } = getState();
    const { courseId } = location;
    const { hashtag, ...restPayload } = payload;

    dispatch({ type: REQUEST_POST_CREATE });
    alert(locale['new.creatingPost'], 1000);
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
      if (res.status === 200 || res.status === 204) {
        alert(locale['new.createdPost'], 2000, true);
        // go back twice as <Compose/> + <ComposePreview/>
        NavigationService.goBackNTimes(2);
        if (res.status === 200) {
          // deep link to newly created post
          Linking.openURL(`${deepLink.prefix}${deepLink.post(encrypt(res.payload.topicId))}`);
        }
        // refresh post list
        dispatch(fetchPosts());
      } else {
        // failure
        alert(`${locale['new.error']} ${res.status}`);
      }
    } catch (error) {
      // failure
      alert(locale['new.error']);
    }
    dispatch({ type: END_POST_CREATE });
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case REQUEST_POST_CREATE:
      return {
        ...state,
        status: LOADING
      };
    case END_POST_CREATE:
      return {
        ...state,
        status: STILL
      };
    default:
      return state;
  }
};
