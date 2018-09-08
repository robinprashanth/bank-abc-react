import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../store/store';
import { clear } from '../../actions/AlertAction';
import Layout from '../Layout/Layout';
// import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
// import Page404 from '../Page404/Page404';
import Page500 from '../Page500/Page500';

class Routes extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      console.log(action);
      // clear alert on location change
      dispatch(clear());
    });
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" component={Layout} />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert
  };
};

export default connect(mapStateToProps)(Routes);
