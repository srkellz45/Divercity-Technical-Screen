import React from 'react';

import Message from './message.message.components';

class Messages extends React.Component {
  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const fromMe = this.props.messages.username === localStorage.username ? 'from-me' : '';
    return (
      <div className='messages' id='messageList'>
        <div className={`message ${fromMe}`}>
         <div className='username'>
           { this.props.messages.username }
         </div>
         <div className='message-body'>
           { this.props.messages.message }
         </div>
       </div>
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
