import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { logout } from '../../actions/UserAction';

import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.logOut = this.logOut.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logOut() {
    const { logOutUser } = this.props;
    logOutUser();
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <Navbar color="light" dark expand="md">
          <NavbarBrand href="/">ABC Bank</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/robinprashanth/bank-abc-react">GitHub Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">{`Welcome ${user.firstName}  ${user.lastName}`}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Settings
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logOut}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  return {
    user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({ logOutUser: () => dispatch(logout(ownProps.history)) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

