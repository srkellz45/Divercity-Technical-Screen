import React from 'react';
const ProfileGroups = ({ data, handler }) => {
    return (
      <div className="Recommended-grid" key={data.id}>
        <div className="Recommended-image">
          <img src={ data.attributes.picture_main } alt="Company-Image" />
        </div>
        <div className="Recommended-title">
          { data.attributes.title }
        </div>
        <div id="Recommended-item">
          <div id="Recommended-members">
          <br />
            { data.attributes.followers_count } Members
          </div>
        </div>
          <button
            id={ data.id }
            onClick={ handler }
            className="recommended-btn"
          >
            Join
          </button>
      </div>
    );
  }

export default ProfileGroups;
