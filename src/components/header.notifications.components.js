import React from 'react';
import { NavLink } from 'react-router-dom';

const Notifications = (data, key) => {
  let Message;
    Message = data.data.message.split("</b>")[1];
  return (
      <div className="Notification-dropdown" key={key}>
        <NavLink to={`/notifications`}>
          <div className="Notification-item">
            <div className="Notification-image">
              <NavLink to={`/users/${data.data.last_active_user_info.id}`}>
                <img src={data.data.last_active_user_info.avatar_thumb} alt="User" />
              </NavLink>
            </div>
            <div className="Notification-title">
            <NavLink to={`/users/${data.data.last_active_user_info.id}`}>
              <b>{data.data.last_active_user_info.name} </b>
            </NavLink>
              {Message}
              <div className="Notification-date">
               {data.data.updated_ago_in_words} ago
              </div>
            </div>
          </div>
        </NavLink>
      </div>
  );
}

export default Notifications;
