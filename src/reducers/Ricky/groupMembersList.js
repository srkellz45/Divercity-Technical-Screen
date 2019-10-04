import { LOAD_GROUP_MEMBERS } from '../../actions/group.actions';

const initialState = [];

const groupMembersList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_GROUP_MEMBERS:
      return [ ...action.member ];
    default:
      return state;
  }
};

export default groupMembersList;