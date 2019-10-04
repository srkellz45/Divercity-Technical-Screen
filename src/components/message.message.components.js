import React from 'react';
import Moment from 'moment';

const Message = ({ messages }) => {
 return (
   <div className="DirectMessage-body" key={messages.id}>
     <div className="DirectMessage-profile-photo">
       <img src={ messages.from_user_avatar_thumb } alt="profile"/>
     </div>
     <div className="DirectMessage-item">
       <div className="DirectMessage-Name" >
         { messages.from_username }
         <div className="DirectMessage-time" >
           { Moment( messages.message_created_at ).fromNow() }
         </div>
       </div>
       <div className="DirectMessage-Data" >
         { messages.message }
       </div>
     </div>
   </div>
 );
}

export default Message;
