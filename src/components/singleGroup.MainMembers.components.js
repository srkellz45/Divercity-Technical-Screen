import React from 'react';
import { NavLink } from 'react-router-dom';

const MemberIcons = ({ data }) => {
  let addDefaultSrc = (evt) => {
    evt.target.src = 'https://s3-us-west-2.amazonaws.com/pinc-backend/images/cdn/avatars/Profile2.png';
  };

  const groupMembers = data.slice(0, 9).map((connection) => {
    let connections = connection.attributes;
      return (
        <div className="Group-Members-icon" key={connection.id}>
          <div id="Group-Members-profile-photo">
          <a href={`/users/${connection.id}`}>
            <img src={ connections.avatar_medium }  onError={ addDefaultSrc } alt="profile" />
          </a>
          </div>
        </div>
      );
    });

  return (
    <div className="Group-Members-icon-body">
    { groupMembers }

    </div>
  )
}
export default MemberIcons;
