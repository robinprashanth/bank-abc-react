import axios from 'axios';
import { LoginType } from './ActionType';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function userLogin(userCredentials) {
  return (dispatch) => {
    axios
      .post(`${config.BASE_URL}/rest/userlogin?t=${Date.now()}`, userCredentials, HEADER_CONFIG)
      .then(response => {
        if (response.data.dbData.token) {
          setAuthorizationToken(response.data.dbData.token);
        }
        dispatch({
          type: LoginType.LOGIN_SUCCESS,
          data: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: LoginType.LOGIN_ERROR, message: err });
      });
  };
}

export function userLogOut() {
  setAuthorizationToken(undefined);
  return { type: LoginType.LOGOUT_SUCCESS };
}

