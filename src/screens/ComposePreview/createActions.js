import { Linking } from 'react-native';
import { REQUEST_POST_CREATE, END_POST_CREATE } from 'hkufui/src/constants/actionTypes';
import { link, compose, reply } from 'hkufui/config/webapi';
import { localize } from 'hkufui/locale';
import { LOADING, STILL } from 'hkufui/src/constants/loadStatus';
import NavigationService from 'hkufui/src/NavigationService';
import { deepLink } from 'hkufui/config';
import { encrypt } from 'hkufui/src/safe';

import { fetchPosts } from '../Preview/PostPreviewLoader/loadPosts';
import { onLoad } from '../Post/viewActions';

const locale = localize({ language: 'en', country: 'hk' });

function requestCompose({ payload, alert, link, credential }) {
  return async dispatch => {
    dispatch({ type: REQUEST_POST_CREATE });
    alert(locale['new.creatingPost'], 1000);
    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...credential,
          ...payload
        })
      });
      const res = await response.json();
      dispatch({ type: END_POST_CREATE });
      switch (res.status) {
        case 200:
          return { ...res.payload };
        case 204:
          return;
        default:
          // failure
          alert(`${locale['new.error']} ${res.status}`);
      }
    } catch (error) {
      // failure
      alert(locale['new.error']);
      dispatch({ type: END_POST_CREATE });
    }
  };
}

export function onReply({ payload, alert, native }) {
  return async (dispatch, getState) => {
    const { location, credential } = getState();
    const { recentTopic: topicId, courseId } = location;

    await dispatch(requestCompose({
      payload: {
        ...payload,
        ...(!native && { code: courseId })
      },
      alert,
      link: native ? link(reply.native({ topicId })) : link(reply.moodle({ topicId })),
      credential: {
        username: credential.userId,
        token: credential.token,
        ...(!native && { moodleKey: credential.moodleKey })
      }
    }));

    alert(locale['reply.success'], 2000, true);
    // go back twice as <Compose /> + <ComposePreview />
    NavigationService.goBackNTimes(2);
    // refresh replies
    dispatch(onLoad({ id: topicId }));
  };
}

export function onCompose({ payload, alert, native }) {
  return async (dispatch, getState) => {
    const { location, credential } = getState();
    const { courseId } = location;

    const { topicId } = await dispatch(requestCompose({
      payload,
      alert,
      link: native ? link(compose.native({ courseId })) : link(compose.moodle({ courseId })),
      credential: {
        username: credential.userId,
        token: credential.token,
        ...(!native && {moodleKey: credential.moodleKey})
      }
    }));

    alert(locale['new.createdPost'], 2000, true);
    // go back twice as <Compose /> + <ComposePreview />
    NavigationService.goBackNTimes(2);
    if (topicId) {
      // deep link to newly created post
      Linking.openURL(`${deepLink.prefix}${deepLink.post(encrypt(topicId))}`);
    }
    // refresh post list
    dispatch(fetchPosts());
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
