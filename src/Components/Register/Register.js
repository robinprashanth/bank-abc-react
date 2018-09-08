/*eslint-disable*/
import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormGroup,
  Form
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validator from './RegisterValidator';
import { register } from '../../actions/UserAction';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { registerUser } = this.props;
    const { errors, isValid } = validator(user);
  
    if (isValid) {
      this.setState({ errors: {} });
      registerUser(user);
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { registering, alert } = this.props;
    const { user, submitted, errors } = this.state;
    const auth = localStorage.getItem('user');
    if (auth) {
      return <Redirect to='/' />
    }
    return (
      <div className="login-banner app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                  }
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <Form name="form" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon
                            icon="user"
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        invalid={!user.firstName && submitted}
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={user.firstName}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    {errors.firstName && <div className="help-block">{errors.firstName}</div>}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon
                            icon="user"
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        invalid={!user.lastName && submitted}
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={user.lastName}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    {errors.lastName && <div className="help-block">{errors.lastName}</div>}
                  </FormGroup>
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
                        invalid={!user.email && submitted}
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    {errors.email && <div className="help-block">{errors.email}</div>}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon
                            icon="key"
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        invalid={!user.password && submitted}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    {errors.password && <div className="help-block">{errors.password}</div>}
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
                        invalid={!user.passwordcheck && submitted}
                        type="password"
                        placeholder="re-enter password"
                        name="passwordcheck"
                        value={user.passwordcheck}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    {errors.passwordcheck && <div className="help-block">{errors.passwordcheck}</div>}
                  </FormGroup>
                  <Button color="success" block>Create Account</Button>
                  {registering &&
                    <img
                      alt="spinner"
                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    />
                  }
                </Form>
                </CardBody>
                <CardFooter className="text-center">
                  <Link to="/login">Cancel</Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { registering } = state.registration;
  const { alert } = state;
  return {
    registering,
    alert
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    registerUser: (user) => dispatch(register(user, ownProps.history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
