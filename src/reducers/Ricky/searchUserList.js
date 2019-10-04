import { SEARCH_USERS, SEARCH_USER_MENTION } from '../../actions/user.actions';
const initialState = [];

const searchUserList = (state = initialState, action) => {
  switch (action.type){
    case SEARCH_USERS:
      return [ ...action.results ];
    case SEARCH_USER_MENTION:
      return [ ...action.results_usr ];
    default:
      return state;
  }
};

export default searchUserList;