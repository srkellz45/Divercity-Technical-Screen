import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getOtherUser } from '../../actions/user.actions';
import { sendNewMessage, loadChat, createChatID, getAllChats } from '../../actions/chat.actions';
import { url } from '../../lib/url';
import Chats from '../../components/message.chats.components.js';
import Message from '../../components/message.message.components.js';
import NewMessage from '../../components/message.new.components.js';
import ChatBox from '../Messages/ChatBox';
import NewMessageChatBox from './NewMessageChatBox';
import Header from '../../components/Header.js';

// let wssURL = 'wss://api.divercity.io/cable';
 let ID = parseInt(localStorage.getItem('id'));
// let socketURL = `${wssURL}/?token=${localStorage.getItem('access-token')}&client=${localStorage.getItem('client')}&uid=${localStorage.getItem('uid')}`;
// let ws = new WebSocket(socketURL);

class NewMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      searchValue: '',
      chatInput: '',
      chatID: localStorage.chatID,
      otherID: '',
      selected: true,
    };
    this.addMessage = this.addMessage.bind(this);
    this.handleLoadChat = this.handleLoadChat.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleChatInput = this.handleChatInput.bind(this);
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
    this.props.getUser(ID);
    this.props.getOtherUser(this.props.match.params.id);
    this.props.getAllChats(ID);
    this.props.createChatID(ID, this.props.match.params.id);
  }
  // componentDidUpdate(prevProps, prevState) {
  //   // This loads the most recent messages upon receiving allMessages PROPS
  //   if (prevProps.allMessages !== this.props.allMessages) {
  //     if(!this.state.chatID.length){
  //       this.setState({
  //         chatID: this.props.allMessages[0].chat_id,
  //         otherID: this.props.allMessages[0].id,
  //       });
  //     this.props.loadChat(ID, this.props.allMessages[0].chat_id, this.props.allMessages[0].id);
  //   }
  // }
  // }


  // sendHandler(evt) {
  //   evt.preventDefault();
  //   const messageObject = {
  //     from_username: 'Ricky Peters',
  //     message: this.state.chatInput,
  //     from_user_avatar_thumb: localStorage.image
  //   };
  //   // Emit the message to the server
  //   this.props.sendNewMessage(messageObject.message, this.state.chatID);

  //   messageObject.fromMe = true;

  //   this.addMessage(messageObject);
  //   this.setState({
  //     chatInput: ''
  //   });
  // }
  handleLoadChat(evt) {
    evt.preventDefault();
    this.setState({
      chatID: parseInt(evt.currentTarget.id.split(', ')[1]),
      otherID: parseInt(evt.currentTarget.id.split(', ')[0]),
      chatHistory: [],
      selected: false,
    });
    let myID = parseInt(localStorage.id);
    let chatID = parseInt(evt.currentTarget.id.split(', ')[1]);
    let otherID = parseInt(evt.currentTarget.id.split(', ')[0]);
    this.props.loadChat(myID, chatID, otherID);
  }

  handleSearchInput(evt) {
    this.setState({
      searchValue: evt.target.value
    });
  }
  handleChatInput(evt) {
    this.setState({
      chatInput: evt.target.value
    });
  }

  render() {
    console.log(this.props.otherUser);
    console.log(localStorage.chatID);
    return (
      <div id="main">
        <Header />
        <div className="Messages-container">
          <div className="Messages-container-left">
          <div id="Messages-search-input">
            <form id="messages-search" onSubmit={this.handleSearch}>
              <input
                value={ this.state.searchValue }
                placeholder="Search"
                id="message-search-form"
                type="text"
                onChange={ this.handleSearchInput } />
            </form>
          </div>

            { this.props.allMessages ? (
              <React.Fragment>

                { this.props.otherUser.length && this.state.selected ? (
                    <div className="Selected-Chats" onClick={this.handleLoadChat}>
                      <div className="colorOverlay">
                        <NewMessage
                          data={ this.props.otherUser[0] }
                          id={ this.props.otherUser[0].id }
                        />
                      </div>
                    </div>
                ) : ( null )}

                { this.props.allMessages.map((messages) => {
                  return (
                  <React.Fragment>
                  { localStorage.chatID === messages.chat_id ? (
                    <div className="Selected-Chats" onClick={this.handleLoadChat} id={`${messages.id}, ${messages.chat_id}`}>
                      <div className="colorOverlay">
                      <Chats
                        data={ messages }
                      />
                      </div>
                    </div>
                  ) : (
                    <div className="Chats" onClick={this.handleLoadChat} id={`${messages.id}, ${messages.chat_id}`}>
                      <Chats
                        data={ messages }
                      />
                      </div>

                  )}
                  </React.Fragment>
                )})
              }
              </React.Fragment>
            ) : (
              <div className="Loading-Chats">
                loading chat history
              </div>
            )}
          </div>
            <div className="Chatbox-header">
            { this.props.allMessages.length ? (
              <React.Fragment>
              { this.props.allMessages.map((messages) => {
                return (
                  <React.Fragment>
                  { localStorage.chatID === messages.chat_id ? (
                    <div id="chat-header">
                      <div className="Chat-image">
                        <img src={messages.avatar_thumb} alt="chat" />
                      </div>
                      <div id="Chat-Name">
                        {messages.name}
                      </div>
                    </div>
                  ) : null }
                  </React.Fragment>
                )})}
              </React.Fragment>
            ) : null }
            </div>
          <div className="Messages-container-right">
            { this.props.otherUser.length && this.state.selected ? (
              <NewMessageChatBox
                chatID={localStorage.chatID}
              />
            ) : ( null )}

          </div>

        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user : state.userList,
    chatID : state.chatID,
    messages : state.chatList,
    allMessages : state.allChatsList,
    otherUser: state.otherUserList,
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
      dispatch(loadChat(myID, chatID, otherID));
    },
    createChatID: (myID, otherID) => {
      dispatch(createChatID(myID, otherID))
    },
    getAllChats: (id) => {
      dispatch(getAllChats(id))
    },
    getOtherUser: (id) => {
      dispatch(getOtherUser(id));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessages);



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