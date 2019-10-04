import React from 'react';
import { NavLink } from 'react-router-dom';
const UserGroups = ({ image, title, followers, id, handler }) => {
    return (
      <div className="Recommended-grid" key={id}>
        <div className="Recommended-image">
        <NavLink to={`/groups/${id}/`}>
          <img src={ image } alt="Company-Image" />
        </NavLink>
        </div>
        <div className="Recommended-title">
        <NavLink to={`/groups/${id}/`}>
          { title }
        </NavLink>
        </div>
        <div id="Recommended-item">
          <div id="Recommended-members">
          <br />
            { followers } Members
          </div>
        </div>
          <button
            id={ id }
            onClick={ handler }
            className="recommended-btn"
          >
            Join
          </button>
      </div>
    );
  }

export default UserGroups;
