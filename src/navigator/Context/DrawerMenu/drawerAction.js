import { link, profile, logout } from 'hkufui/config/webapi';
import { Alert } from 'react-native';
import { LOGOUT, UPDATE_TEMPERATURE } from 'hkufui/src/constants/actionTypes';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export function onLogout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
}

export function onActiveLogout() {
  return async (dispatch, getState) => {
    const { credential } = getState();
    try {
      const response = await fetch(link(logout()), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credential.userId,
          token: credential.token
        }),
      });
      const res = await response.json();
      if (res.status === 204) {
        dispatch(onLogout());
      } else {
        Alert.alert(`${locale['alert.logoutFail']} ${res.status}`);
        throw new Error('not-logged-out');
      }
    } catch (error) {
      Alert.alert(locale['fetch.noNetwork']);
      throw error;
    }
  };
}

export function onLoadUserTemperature() {
  return async (dispatch, getState) => {
    const { credential } = getState();
    try {
      const response = await fetch(link(profile.temperature()), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credential.userId,
          token: credential.token
        }),
      });
      const res = await response.json();
      if (res.status === 200) {
        // success
        dispatch({
          type: UPDATE_TEMPERATURE,
          payload: { ...res.payload }
        });
      }
    } catch (error) { /* ignored */ }
  };
}

const handleActions = (state = {}, action = {}) => {
  switch (action.type) {
    case UPDATE_TEMPERATURE:
      return {
        ...state,
        temperature: action.payload.temperature
      }
    default:
      return state;
  }
};

export default handleActions;
