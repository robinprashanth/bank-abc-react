import axios from 'axios';
import AppConfig from '../config';
/*eslint-disable*/

const requestOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
};

export const loginUser = (email, password) => {

  const credentials = {
    email,
    password
  };

  return axios.post(`${AppConfig.BASE_URL}/login`, credentials, requestOptions)
    .then(handleResponse)
    .then(data => {
      // login successful if there's a jwt token in the response
      if (data.user) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data.user;
    })
}

export const registerUser = (user) => {

  return axios.post(`${AppConfig.BASE_URL}/register`, user, requestOptions)
    .then(handleResponse)
}

export const performTransaction = (transaction, id) => {
  return axios.post(`${AppConfig.BASE_URL}/transaction/${id}`, transaction, requestOptions)
    .then(handleResponse)
}

export const getTransactionsList = (id) => {
  return axios.get(`${AppConfig.BASE_URL}/transaction/${id}`, requestOptions)
    .then(handleResponse)
}

export function logoutUser() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if(response.data.error) {
            reject(response.data.message);
        } else {
            resolve(response.data.body);
        }
    }) 
}
