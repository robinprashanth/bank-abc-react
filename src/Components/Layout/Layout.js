import React from 'react';
import { Container } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../Routes/AppRoutes';

import Header from '../Header/Header';
import './Layout.scss';
/* eslint-disable */

class Layout extends React.Component {

  componentWillMount() {
    const { history } = this.props;
    const auth = localStorage.getItem('user');
    if (!auth) {
      history.push('/login')
    }
  }

  render() {
    const auth = localStorage.getItem('user');
    if (!auth) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        <Header />
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )}
                    />)
                    : (null);
                  })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;
