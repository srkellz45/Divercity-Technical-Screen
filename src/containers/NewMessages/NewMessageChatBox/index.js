import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/user.actions';
import { sendFirstMessage, loadChat, createChatID, getAllChats } from '../../../actions/chat.actions';
import { url } from '../../../lib/url';
import Message from '../../../components/message.message.components.js';

let wssURL = 'wss://api.divercity.io/cable';
let ID = parseInt(localStorage.getItem('id'));
let socketURL = `${wssURL}/?token=${localStorage.getItem('access-token')}&client=${localStorage.getItem('client')}&uid=${localStorage.getItem('uid')}`;
let ws = new WebSocket(socketURL);

class NewMessageChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      searchValue: '',
      chatInput: '',
      chatID: '',
      otherID: '',
      userTyping: false,
      userNameTyping: '',
    };
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleChatInput = this.handleChatInput.bind(this);
    this.openSocket = this.openSocket.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }
  addMessage(message) {
    // Append the message to the component state
    let messageAdd = this.state.chatHistory;
    messageAdd.push(message);
    this.setState({
      chatHistory: messageAdd
    });
    //ws.send(JSON.stringify(messages));
  }
  componentDidMount() {
    this.openSocket();
    this.props.getUser(ID);
    this.props.getAllChats(ID);
    //this.props.createChatID(ID, this.props.match.params.id);
    // This loads the most recent messages upon receiving allMessages PROPS
    // if(!localStorage.chatID.length){
    //   this.setState({
    //     chatID: this.props.allMessages[0].chat_id,
    //     otherID: this.props.allMessages[0].id,
    //   });
    //   this.props.loadChat(ID, this.props.allMessages[0].chat_id, this.props.allMessages[0].id);
    // }
  }
  openSocket () {
    let socketURL = `${wssURL}/?token=${localStorage.getItem('access-token')}&client=${localStorage.getItem('client')}&uid=${localStorage.getItem('uid')}`;
    let ws = new WebSocket(socketURL);

    let subscribe_params = JSON.stringify({
      command: 'subscribe',
      identifier: JSON.stringify({
        chat_id: this.props.canon,
        channel: 'MessagesChannel'
      })
    });

    ws.onopen = function(e) {
      console.log(e, 'onopen ------');
      // SUBSCRIBE
      ws.send(subscribe_params);
    };

    ws.onmessage = function (evt) {
      var receivedData = JSON.parse(evt.data || '{}');
      var dataIdentity = JSON.parse(receivedData.identifier || '{}');
      var messageData = receivedData.message;
      if (
        receivedData.identifier &&
        dataIdentity.channel === 'MessagesChannel' &&
        dataIdentity.chat_id === this.state.chatID &&
        messageData
      ) {
        var incomingMessage = receivedData.message;
        if (incomingMessage.event_type && incomingMessage.event_type.match(/rtm/)) {
          if (parseInt(this.state.otherID) === parseInt(incomingMessage.typing_user_id)) {

            if (incomingMessage.event_sub_type === 'start_chat_typing') {
              this.setState({
                userTyping: true,
                userNameTyping: incomingMessage.message
              });
            }
            if (incomingMessage.event_sub_type === 'end_chat_typing') {
              this.setState({
                userTyping: false,
                userNameTyping: ''
              });
            }
          }
        }
        if (incomingMessage.from_username && incomingMessage.from_username !== localStorage.username) {
          this.setState({
            chatHistory : [ ...this.state.chatHistory, incomingMessage],
            userTyping: false,
            userNameTyping: ''
          });
        }
      }
    }.bind(this);

    ws.onclose = function(e) {
      console.log(e, "Connection is closed...");
    };
  }
  componentWillUnmount() {
    ws.close();
    localStorage.removeItem("chatID");
  }

  clearHistory () {
    this.setState({
      chatHistory: []
    });
  }
  componentDidUpdate(prevProps, prevState) {
    // This loads the most recent messages upon receiving allMessages PROPS
    if (prevProps.messages !== this.props.messages) {
      this.clearHistory();
      this.openSocket();
    }
  }

  sendHandler(evt) {
    evt.preventDefault();
    const messageObject = {
      from_username: localStorage.name,
      message: this.state.chatInput,
      from_user_avatar_thumb: localStorage.image
    };

    console.log(localStorage.chatID);
    this.props.sendFirstMessage(messageObject.message, localStorage.chatID);

    messageObject.fromMe = true;

    this.addMessage(messageObject);
    this.setState({
      chatInput: ''
    });
  }

  handleChatInput(evt) {
    this.setState({
      chatInput: evt.target.value
    });
  }

  render() {
    return (
        <React.Fragment>
          <div className="Messages-ChatInput">
            <form className="chat-input" onSubmit={this.sendHandler}>
              <input type="text"
                onChange={this.handleChatInput}
                value={this.state.chatInput}
                placeholder="Write a Message..."
                autoFocus={true}
                />
            </form>
          </div>
          <div className="myMessages">
          { this.state.chatHistory.length ? (
            <React.Fragment>
                { this.state.chatHistory.map((chats) => {
                  return (
                    <div className="DirectMessages">
                      <Message messages={ chats } />
                  </div>
                  )
                })}
            </React.Fragment>
          ) : null }
          </div>

       <div className="NewMessageHeader">
         Send your first message
       </div>


        </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.userList,
    chatID : state.chatID,
    messages : state.chatList,
    allMessages : state.allChatsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    sendFirstMessage: (message, id) => {
      dispatch(sendFirstMessage(message, id));
    },
    loadChat: (myID, chatID, otherID) => {
      dispatch(loadChat(myID, chatID, otherID));
    },
    createChatID: (myID, otherID) => {
      dispatch(createChatID(myID, otherID))
    },
    getAllChats: (id) => {
      dispatch(getAllChats(id))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageChatBox);



           // <div>
           // { this.state.chatHistory.length ? (
           //     <React.Fragment>
           //         { this.state.chatHistory.map((chats) => {
           //           return (
           //             <div>
           //               <Message messages={chats} />
           //           </div>
           //           )
           //         })}
           //     </React.Fragment>
           //   ) : null }
           // </div>
           // </div>