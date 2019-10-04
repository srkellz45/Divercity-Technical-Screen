import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/dLogo.png';
const RegisterHeader = () => {
  return (
      <div className="Register-Header">
        <NavLink to="/feed" id="header-links">
          <img id="header-logo" src={logo} alt="logo" />
        </NavLink>
        <NavLink to={`/${localStorage.id}/user`} id="header-links">
          <div id="header-text">
            <strong>My Profile</strong>
          </div>
        </NavLink>
        <NavLink to="/logout" id="header-links">
          <div id="header-text">
            <strong>Logout</strong>
          </div>
        </NavLink>
      </div>
  );
}

export default RegisterHeader;
