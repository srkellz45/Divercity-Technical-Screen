import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/user.actions';
import { sendNewMessage, loadChat, createChatID } from '../../../actions/chat.actions';
import { url } from '../../../lib/url';
import Messages from '../../../components/message.messages.components.js';
import OldMessages from '../../../components/oldMessage.messages.components.js';
import ChatInput from '../ChatInput';
import Header from '../../../components/Header.js';

let wssURL = 'wss://api.divercity.io/cable';
let ID = parseInt(localStorage.getItem('id'));
require('../../../styles/ChatApp.css');
let socketURL = `${wssURL}/?token=${localStorage.getItem('access-token')}&client=${localStorage.getItem('client')}&uid=${localStorage.getItem('uid')}`;
let ws = new WebSocket(socketURL);

class DirectMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      test: null
    };
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }
  addMessage(message) {
    console.log(message);
    // Append the message to the component state
    const messages = this.state.chatHistory;
    messages.push(message);
    this.setState({ messages });
    this.socket.emit('client:message', messageObject);
  }
  componentDidMount() {
    console.log("yep");
    this.props.getUser(ID);

    this.props.createChatID(ID, this.props.match.params.id);
    let subscribe_params = JSON.stringify({
      command: 'subscribe',
      identifier: JSON.stringify({
      chat_id: localStorage.chatID,
      channel: 'MessagesChannel'
      })
    });

    ws.onmessage = function (evt) {
      var receivedData = JSON.parse(evt.data || '{}');
      var dataIdentity = JSON.parse(receivedData.identifier || '{}');
      var messageData = receivedData.message;
      console.log(messageData);
      if (
        receivedData.identifier &&
        dataIdentity.channel === 'MessagesChannel' &&
        dataIdentity.chat_id === localStorage.chatID &&
        messageData
      ) {
        var incomingMessage = receivedData;
        let messageObject = {
          username: incomingMessage.message.from_username,
          message: incomingMessage.message.message,
          };
        this.setState({
          chatHistory : [ ...this.state.chatHistory, messageObject]
        });
      }
    }.bind(this);

    ws.onopen = function(e) {
    console.log(e, 'onopen ------');
      // SUBSCRIBE
      ws.send(subscribe_params);
    }.bind(this);

    ws.onclose = function(e) {
      console.log(e, 'closed');
    }.bind(this);
  }

  componentWillUnmount() {
    ws.onclose = function(e) {
      console.log(e, 'closed');
    }.bind(this);
  }

  sendHandler(message) {
    console.log(message, "YAAA");
    const messageObject = {
      username: this.props.username,
      message
    };
    console.log(this.props.chatID.id, "CHATID");
    // Emit the message to the server
    this.props.sendNewMessage(message, localStorage.chatID);
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

render() {


    return (
      <div className="container">
        <Header />
        <h3>Chat (Not styled)</h3>
        <ChatInput onSend={this.sendHandler} />
        { this.props.messages.chats ? (
          <div>
            <OldMessages messages={this.props.messages} />
          </div>
          ) : <div> loading chat history </div>
        }
        <div>
        { this.state.chatHistory.length ? ( // APPLICATIONS FEED
            <React.Fragment>
                { this.state.chatHistory.map((chats) => {
                  return (
                    <div>
                      <Messages messages={chats} />
                  </div>
                  )
                })}
            </React.Fragment>
          ) : null }
        </div>
      </div>
    );
  }

}
DirectMessage.defaultProps = {
  username: localStorage.name
};

const mapStateToProps = (state) => {
  return {
    user : state.userList,
    chatID : state.chatID,
    messages : state.chatList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    sendNewMessage: (message, id) => {
      dispatch(sendNewMessage(message, id));
    },
    loadChat: (myID, chatID, otherID) => {
      dispatch(loadChat());
    },
    createChatID: (myID, otherID) => {
      dispatch(createChatID(myID, otherID))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectMessage);
