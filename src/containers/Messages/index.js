import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/user.actions';
import { sendNewMessage, loadChat, createChatID, getAllChats } from '../../actions/chat.actions';
import { NavLink } from 'react-router-dom';
import { url } from '../../lib/url';
import Chats from '../../components/message.chats.components.js';
import Message from '../../components/message.message.components.js';
import ChatBox from './ChatBox';
import Header from '../../components/Header.js';

// let wssURL = 'wss://api.divercity.io/cable';
// let socketURL = `${wssURL}/?token=${localStorage.getItem('access-token')}&client=${localStorage.getItem('client')}&uid=${localStorage.getItem('uid')}`;
// let ws = new WebSocket(socketURL);

class DirectMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chatHistory: [],
			searchValue: '',
			chatInput: '',
			chatID: '',
			otherID: '',
			ID: parseInt(localStorage.getItem('id'))
		}
	}

	addMessage = message => {
		// Append the message to the component state
		let messageAdd = this.state.chatHistory;

		messageAdd.push(message);

		this.setState({
			chatHistory: messageAdd
		});
	}

  componentDidMount() {
  	var {ID} = this.state;

    this.props.getUser(ID);
    this.props.getAllChats(ID);
    // ws.onopen = function(e) {
    //   console.log(e, 'onopen ------');
    //     // SUBSCRIBE
    //     ws.send(subscribe_params);
    // }.bind(this);
    //this.props.createChatID(ID, this.props.match.params.id);
  }

	componentDidUpdate(prevProps, prevState) {
		// This loads the most recent messages upon receiving allMessages PROPS
    	if( this.props.allMessages.length ) {
      		if (prevProps.allMessages !== this.props.allMessages) {
        		if(!this.state.chatID.length){
					this.setState({
						chatID: this.props.allMessages[0].chat_id,
						otherID: this.props.allMessages[0].id
					});

					this.props.loadChat(this.state.ID, this.props.allMessages[0].chat_id, this.props.allMessages[0].id);
				}
    		}
		}
	}

	sendHandler = evt => {
		evt.preventDefault();

		const messageObject = {
			from_username: localStorage.username,
			message: this.state.chatInput,
			from_user_avatar_thumb: localStorage.image
		};

		// Emit the message to the server
		this.props.sendNewMessage(messageObject.message, this.state.chatID);

		messageObject.fromMe = true;

		this.addMessage(messageObject);

		this.setState({
			chatInput: ''
		});
	}

  handleLoadChat = evt => {
    evt.preventDefault();

    this.setState({
      chatID: parseInt(evt.currentTarget.id.split(', ')[1]),
      otherID: parseInt(evt.currentTarget.id.split(', ')[0]),
      chatHistory: [],
    });

    let myID = parseInt(localStorage.id);
    let chatID = parseInt(evt.currentTarget.id.split(', ')[1]);
    let otherID = parseInt(evt.currentTarget.id.split(', ')[0]);
    this.props.loadChat(myID, chatID, otherID);
  }

	handleChatInput = evt => this.setState({
		chatInput: evt.target.value
	});

  render() {
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
							onChange={ evt => this.setState({searchValue: evt.target.value}) }
						/>
					</form>
				</div>

				{ this.props.allMessages ? 
					this.props.allMessages.map((messages, i) => (
						<div key={i} className={ this.state.chatID === messages.chat_id ? "Selected-Chats" : "Chats"} id={`${messages.id}, ${messages.chat_id}`}>
							<div className={ this.state.chatID === messages.chat_id ? "colorOverlay" : null}>
								<Chats data={ messages }/>
							</div>
						</div>
					)) : ( <div className="Loading-Chats">loading chat history</div> )
				}
			</div>

            <div className="Chatbox-header">
				{ this.props.allMessages.length ? this.props.allMessages.map((messages, i) => this.state.chatID === messages.chat_id ? (
						<div id="chat-header" key={i}>
							<div className="Chat-image">
								<a href={`/users/${messages.chat_users[messages.chat_users[1].id === this.state.ID ? 0 : 1].id}`} >
								<img src={messages.avatar_thumb} alt="chat" />
								</a>
							</div>

							<div id="Chat-Name">
								<a href={`/users/${messages.chat_users[messages.chat_users[1].id === this.state.ID ? 0 : 1].id}`} >
								{messages.name}
								</a>
							</div>
						</div>
					) : null )
					: <div className="No-Messages"></div>
				}
            </div>

          <div className="Messages-container-right">
            { this.props.messages.length ? (
              <ChatBox
                canon={this.props.messages[0].chat_id}
                chatID={this.state.chatID}
              />
            ) : ( <div className="No-Messages"> No messages yet </div> )}
          </div>
        </div>
      </div>
    );
  }
}

DirectMessage.defaultProps = {
	username: localStorage.name
};

const mapStateToProps = state => ({
    user : state.userList,
    chatID : state.chatID,
    messages : state.chatList,
    allMessages : state.allChatsList
});

export default connect(mapStateToProps, {getUser, sendNewMessage, loadChat, createChatID, getAllChats})(DirectMessage);