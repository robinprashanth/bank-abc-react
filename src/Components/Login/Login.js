import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Form,
  FormGroup
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validator from './LoginValidator';
import { login } from '../../actions/UserAction';

import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      email: '',
      password: '',
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { loginUser } = this.props;
    const userCred = {
      email,
      password
    };
    const { errors, isValid } = validator(userCred);
    if (isValid) {
      this.setState({ errors: {} });
      loginUser(email, password);
    } else {
      this.setState({ errors });
    }
  }

/*eslint-disable*/
  render() {
    const { loggingIn, alert, history } = this.props;
    const { email, password, submitted, errors } = this.state;
    const auth = localStorage.getItem('user');
    if (auth) {
      return <Redirect to='/' />
    }

    return (
      <div className="login-banner app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {alert.message &&
                      <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Form name="form" onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon
                                icon="envelope"
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            invalid={!email && submitted}
                            type="text"
                            placeholder="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                        {errors.email && <div className="help-block">{errors.email}</div>}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon
                                icon="key"
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            invalid={!password && submitted}
                            type="password"
                            placeholder="password"
                            name="password"
                            value={password} onChange={this.handleChange}
                          />
                        </InputGroup>
                        {errors.password && <div className="help-block">{errors.password}</div>}
                      </FormGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                      {loggingIn &&
                        <img
                          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                        />
                      }
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Open a Saving Account with us and enjoy unlimited transactions without any fee.
                      </p>
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        onClick={() => history.push('/register')}
                      >
                        Create Account
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggingIn } = state.authentication;
  const { alert } = state;
  return {
      loggingIn,
      alert
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginUser: (username, password) => dispatch(login(username, password, ownProps.history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
