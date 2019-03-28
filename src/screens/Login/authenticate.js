import { LOGIN_ERROR, LOGGED_IN, LOGGING_IN } from 'hkufui/src/constants/actionTypes';
import { link } from 'hkufui/config/webapi';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export function onLogin({ credential, alert, path, fcmToken }) {
  return async (dispatch) => {
    const payload = { ...credential, ...(fcmToken && { fcmToken }) };

    dispatch({ type: LOGGING_IN });
    try {
      const response = await fetch(link(path), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const res = await response.json();
      if (res.status === 200) {
        // successful return
        dispatch({
          type: LOGGED_IN,
          payload: {
            userId: credential.username.toLowerCase(),
            ...res.payload
          }
        });
      } else {
        // failure
        let error = `${locale['login.errorMsgPrefix']} ${res.status}`;
        switch(res.status) {
          case 401:
            error = locale['login.failureMsg'];
            break;
          case 421:
            error = locale['login.laterMsg'];
            break;
        }
        if (alert)
          alert(error);
        dispatch({ type: LOGIN_ERROR });
      }
    } catch (error) {
      if (alert)
        alert(locale['fetch.noNetwork']);
      dispatch({ type: LOGIN_ERROR });
    }
  };
}

export function onClear() {
  return (dispatch) => {
    // LOGGING_IN to pass rule loggedIn() in reducer
    dispatch({ type: LOGGING_IN });
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case LOGGING_IN:
      return {}; // empty object as logging in
    case LOGIN_ERROR:
      return null; // clear credential
    case LOGGED_IN:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};
