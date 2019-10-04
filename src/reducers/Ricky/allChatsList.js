import { ALL_CHATS } from '../../actions/chat.actions';

const initialState = [];

const allChatsList = (state = initialState, action) => {
  switch(action.type) {
    case ALL_CHATS:
      return [ ...action.chats.existing_users_chat_list ];
    default:
      return state;
  }
};

export default allChatsList;