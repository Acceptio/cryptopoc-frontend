import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavigationBar = ({
  onLogout,
  children,
  isLogoutLocation,
  userType
}) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          AcceptPay POC
        </Navbar.Brand>
      </Navbar.Header>
      <Nav
        pullRight
      >
        { !!isLogoutLocation ? (
          <NavItem
            onClick={ onLogout }
          >Logout { userType }
          </NavItem>
        ) : ''}
      </Nav>
    </Navbar>
    { children }
  </div>
);

NavigationBar.propTypes = {
  onLogout: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  isLogoutLocation: PropTypes.bool.isRequired,
  userType: PropTypes.string
};

export default NavigationBar;
