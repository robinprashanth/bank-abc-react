/*eslint-disable*/
import { userConstants, alertConstants } from './ActionType';
import { loginUser, registerUser, logoutUser } from '../services/user.service';

export const login = (email, password, history) => {
  return dispatch => {
    dispatch({type: userConstants.LOGIN_REQUEST, user: { email } });
    loginUser(email, password)
      .then(user => { 
        dispatch({type: userConstants.LOGIN_SUCCESS, user })
            history.push('/');
        },
        err => {
          let message = '';
          if(err.response && err.response.data.error) {
            message = err.response.data.message;
          } else {
            message = err.message;
          }
          dispatch({ type: userConstants.LOGIN_FAILURE, err });
          dispatch({ type: alertConstants.ERROR, message });
        }
    );
  };
}

export const logout = (history) => {
    logoutUser();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}

export const register = (user, history) => {
  return dispatch => {
    dispatch({ type: userConstants.REGISTER_REQUEST, user });    
    registerUser(user)
      .then(
        user => { 
          dispatch({ type: userConstants.REGISTER_SUCCESS, user });
          history.push('/login');
        },
        err => {
          let message = '';
          if(err.response && err.response.data.error) {
            message = err.response.data.message;
          } else {
            message = err.message;
          }
          dispatch({ type: userConstants.REGISTER_FAILURE, message });
          dispatch({ type: alertConstants.ERROR, message });
        }
    );
  };
}
