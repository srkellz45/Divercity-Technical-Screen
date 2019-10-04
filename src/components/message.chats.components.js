import React from 'react';
import Moment from 'moment';
import Notification from '../assets/icons/NotificationOval.png';

const Chats = ({ data }) => {
  let hacksaw = (data.last_message.substring(0, 40) + '...');
  return (
    <div className="chats-body" key={data.chat_id}>
      <div className="chats-profile-photo">
        <img src={ data.avatar_medium } alt="profile"/>
      </div>
      { data.unread_message_count > 0 ? ( // if there's unread messages, have them be blue & display notification bubble
      <React.Fragment>
        <div className="unreadchats-time" >
          { Moment( data.last_message_date ).fromNow() }
        </div>
        <div className="notification" >
          <img className="chat-notification-icon" src={Notification} alt="New Message" />
          <div className="chat-notification-number">
            { data.unread_message_count }
          </div>
        </div>
        <div className="chats-item">
        { data.chat_name ? (
          <div className="unreadchats-Name">
            { data.chat_name }
          </div>
        ) : (
          <div className="unreadchats-Name" >
           { data.name }
          </div>
        )}
          <div className="chats-Data" >
          { data.last_message.length < 40 ? // basically if the job data.last_message is too long, cut it off based on string length
          ( <div> { data.last_message } </div> ) :  hacksaw }
          </div>
        </div>
      </React.Fragment>
        ) : (
      <React.Fragment>
        <div className="chats-time" >
          { Moment( data.last_message_date ).fromNow() }
        </div>
        <div className="chats-item" >
            { data.chat_name ? (
          <div className="chats-Name" >
            { data.chat_name }
          </div>
        ) : (
          <div className="chats-Name" >
           { data.name }
          </div>
        )}
          <div className="chats-Data" >
          { data.last_message.length < 10 ? // basically if the job data.last_message is too long, cut it off based on string length
          ( <div> { data.last_message } </div> ) :  hacksaw }
          </div>
        </div>
      </React.Fragment>
      )}
    </div>
  );
}

export default Chats;
