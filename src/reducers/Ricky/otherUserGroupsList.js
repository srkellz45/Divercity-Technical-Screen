import { GET_OTHER_USER_GROUPS } from '../../actions/group.actions';

const initialState = [];

const otherUserGroupsList = (state = initialState, action) => {
  switch (action.type){
    case GET_OTHER_USER_GROUPS:
      return [ ...action.groups ];
    default:
      return state;
  }
};

export default otherUserGroupsList;