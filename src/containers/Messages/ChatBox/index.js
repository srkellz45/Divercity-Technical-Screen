import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/user.actions';
import { sendNewMessage, loadChat, createChatID, getAllChats } from '../../../actions/chat.actions';
import { url } from '../../../lib/url';
import Message from '../../../components/message.message.components.js';

let wssURL = 'wss://api.divercity.io/cable';
let socketURL = `${wssURL}/?token=${localStorage.getItem('access-token')}&client=${localStorage.getItem('client')}&uid=${localStorage.getItem('uid')}`;
let ws = new WebSocket(socketURL);

class ChatBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chatHistory: [],
			searchValue: '',
			chatInput: '',
			chatID: props.canon,
			otherID: '',
			userTyping: false,
			userNameTyping: '',
			ID: parseInt(localStorage.getItem('id'))
		};
	}

	addMessage = message => {
		// Append the message to the component state
		let messageAdd = this.state.chatHistory;
		messageAdd.push(message);

		this.setState({
			chatHistory: messageAdd
		});
		//ws.send(JSON.stringify(messages));
	}

  componentDidMount() {
    var {ID} = this.state;

    this.openSocket();
    this.props.getUser(ID);
    this.props.getAllChats(ID);
    //this.props.createChatID(ID, this.props.match.params.id);
    // This loads the most recent messages upon receiving allMessages PROPS
    if(!this.state.chatID.length){
      this.setState({
        chatID: this.props.allMessages[0].chat_id,
        otherID: this.props.allMessages[0].id,
      });
      this.props.loadChat(ID, this.props.allMessages[0].chat_id, this.props.allMessages[0].id);
    }
  }

  openSocket = () => {
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
        if (incomingMessage.from_username && incomingMessage.from_username !== localStorage.username) {
          this.handleMessage(incomingMessage);
        }
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

      }
    }.bind(this);

    ws.onclose = function(e) {
      console.log(e, "Connection is closed...");
    };
  }
  componentWillUnmount() {
    ws.close();
  }
  handleMessage = msg => {
    if( this.state.userTyping ) {
      this.setState({
        chatHistory : [ ...this.state.chatHistory, msg ],
        userTyping : false,
        userNameTyping : ''
      });
    }
  }


	clearHistory =  () => this.setState({
		chatHistory: []
	});

  componentDidUpdate(prevProps, prevState) {
    // This loads the most recent messages upon receiving allMessages PROPS
    if (prevProps.messages !== this.props.messages) {
      this.clearHistory();
      this.openSocket();
    }
  }

  sendHandler = evt => {
    evt.preventDefault();
    const messageObject = {
      from_username: localStorage.username,
      message: this.state.chatInput,
      from_user_avatar_thumb: localStorage.image
    };
    //console.log(this.state.chatID, "CHATID");
    // Emit the message to the server
    this.props.sendNewMessage(messageObject.message, this.state.chatID);

    messageObject.fromMe = true;

    this.addMessage(messageObject);
    this.setState({
      chatInput: ''
    });
  }

	handleChatInput = evt => this.setState({
		chatInput: evt.target.value
	});

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

          { this.state.userTyping ? (
              <div className="User-Typing">
                { this.state.userNameTyping }
              </div>
          ) : null }

          <div className="myMessages">
          { this.state.chatHistory.length ? (
            <React.Fragment>
              { this.state.chatHistory.map((chats, i) => (
                  <div className="DirectMessages" key={i}>
                    <Message messages={ chats } />
                  </div>
                ))}
            </React.Fragment>
          ) : null }
          </div>

			{ this.props.messages.map((oldMessages, i) => (
					<div className="DirectMessages" key={i}>
						<Message messages={ oldMessages } />
					</div>
				))
			}
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
	user : state.userList,
	chatID : state.chatID,
	messages : state.chatList,
	allMessages : state.allChatsList
});

export default connect(mapStateToProps, {getUser, sendNewMessage, loadChat, createChatID, getAllChats})(ChatBox);