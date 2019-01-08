import { LOGOUT } from 'hkufui/src/constants/actionTypes';

export function onLogout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
}
