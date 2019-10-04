import React, { Component } from 'react';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // clear chat input
    this.setState({
      chatInput: ''
    });
    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
  }

  handleTextInput(event)  {
    this.setState({
      chatInput: event.target.value
    });
  }

  render() {
    return (
      <form className="chat-input" onSubmit={this.handleSubmit}>
        <input type="text"
          onChange={this.handleTextInput}
          value={this.state.chatInput}
          placeholder="Write a message and hit enter to send..."
          required />
      </form>
    );
  }
}

export default ChatInput;
