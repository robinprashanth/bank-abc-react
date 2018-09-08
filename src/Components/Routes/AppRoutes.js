import React from 'react';
import Loadable from 'react-loadable';

import Layout from '../Layout/Layout';

function Loading() {
  return <div>Loading...</div>;
}

const Profile = Loadable({
  loader: () => import('../Profile/Profile'),
  loading: Loading
});

const Dashboard = Loadable({
  loader: () => import('../Dashboard/Dashboard'),
  loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {
    path: '/', exact: true, name: 'Home', component: Layout
  },
  {
    path: '/dashboard', name: 'Dashboard', component: Dashboard
  },
  {
    path: '/profile', name: 'Profile', component: Profile
  }
];

export default routes;
