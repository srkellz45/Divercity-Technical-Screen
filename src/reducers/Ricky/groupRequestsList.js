import { GET_GROUP_REQUESTS, GET_GROUP_INVITES } from '../../actions/group.actions';
const initialState = [];

const groupRequestsList = (state = initialState, action) => {
  switch (action.type){
    case GET_GROUP_REQUESTS:
      return [ ...action.requests ];
    default:
      return state;
  }
};

export default groupRequestsList;