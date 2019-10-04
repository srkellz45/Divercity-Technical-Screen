import { LOAD_CHAT } from '../../actions/chat.actions';

const initialState = [];

const chatList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_CHAT:
      return [...action.chat.chats];
    default:
      return state;
  }
};

export default chatList;