import React from 'react';
import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
const TempHeader = () => {
  return (
      <div className="Temp-Header">
      <Link to="/" id="header-links">
        <img id="temp-logo" src={logo} alt="logo" />
      </Link>
      </div>
  );
}

export default TempHeader;
