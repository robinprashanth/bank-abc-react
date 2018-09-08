import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authentication } from './AuthenticationReducer';
import { alert } from './AlertReducer';
import { registration } from './RegistrationReducer';
import { transactions } from './TransactionReducer';

export default combineReducers({
  router: routerReducer,
  authentication,
  alert,
  registration,
  transactions
});

