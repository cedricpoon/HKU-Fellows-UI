import { LOGIN_ERROR, LOGGED_IN, LOGGING_IN } from 'hkufui/src/constants/actionTypes';
import { link, login } from 'hkufui/config/webapi';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export function onLogin({ username, password }, alert) {
  return async (dispatch) => {
    dispatch({ type: LOGGING_IN });
    try {
      let response = await fetch(link(login.password), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      let res = await response.json();
      if (res.status === 200) {
        // successful return
        dispatch({
          type: LOGGED_IN,
          payload: {
            userId: username.toLowerCase(),
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
        alert(error);
        dispatch({ type: LOGIN_ERROR });
      }
    } catch (error) {
      alert(locale['fetch.noNetwork']);
      dispatch({ type: LOGIN_ERROR });
    }
  };
}

const handleExpandPosts = (state = {}, action = {}) => {
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

export default handleExpandPosts;
