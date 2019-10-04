import { VIEW_OTHER_USER } from '../../actions/user.actions';
import { VIEW_FOLLOWED_USER } from '../../actions/connection.actions';

const initialState = [];

const otherUserList = (state = initialState, action) => {
  switch (action.type){
    case VIEW_OTHER_USER:
      return [ action.user ];
    case VIEW_FOLLOWED_USER:
      return [ action.user ];
    default:
      return state;
  }
};

export default otherUserList;