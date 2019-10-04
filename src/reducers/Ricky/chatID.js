import { CREATE_CHAT_ID } from '../../actions/chat.actions';

const initialState = {};

const chatID = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_CHAT_ID:
      localStorage.setItem('chatID', action.chatID.id);
      return Object.assign({}, state, action.chatID);
    default:
      return state;
  }
};

export default chatID;