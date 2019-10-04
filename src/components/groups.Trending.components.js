import React from 'react';
import { NavLink } from 'react-router-dom';
const TrendingGroups = ({ image, title, followers, id, handler, close, following }) => {
    return (
      <div className="Recommended-grid" key={id}>
        <button id={id} name="Job" className="Recommended-X-button" onClick={close}>
         X
        </button>
        <div className="Recommended-image">
          <NavLink to={`/groups/${id}/`}>
            <img src={ image } alt="Company" />
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
        { following ? (
          <button
            id={ id }
            className="following-recommended-btn"
          >
            Member
          </button>
        ) : (
          <button
            id={ id }
            onClick={ handler }
            className="recommended-btn"
          >
            Join
          </button>
        )}

      </div>
    );
  }

export default TrendingGroups;
