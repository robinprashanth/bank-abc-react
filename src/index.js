import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes from './Components/Routes/Routes';

import './theme/_global.scss';

import store, { history } from './store/store';

library.add(faEnvelope, faKey, faUser);

const app = document.getElementById('app-root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  app
);
