import React from 'react';

const NewMessage = ({ data, id }) => {
  return (
    <div className="chats-body" key={id}>
      <div className="chats-profile-photo">
        <img src={ data.attributes.avatar_medium } alt="profile"/>
      </div>
        <div className="chats-item">
          <div className="unreadchats-Name">
            { data.attributes.name }
          </div>
        </div>
    </div>
  );
}

export default NewMessage;
