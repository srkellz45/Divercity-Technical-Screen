import { GET_GROUPS, LOAD_MORE_GROUPS, FOLLOW_PEOPLE_GROUP } from '../../actions/group.actions';

const initialState = [];
// initial state set as an array,
// instead of doing Object.assign({}, state, etc..).
// It's a cleaner way of using a spread operator.

const groupsList = (state = initialState, action) => {
  switch(action.type) {
    case GET_GROUPS:
      return [ ...action.groups ];
    case FOLLOW_PEOPLE_GROUP:
      return [ ...action.group ];
    case LOAD_MORE_GROUPS:
      let newState = {};
      newState = action.groups;
      localStorage.setItem('pageLimit', action.page);
      return [...state, ...newState];
    default:
      return state;
  }
};

export default groupsList;

