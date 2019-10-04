import { GET_USER_GROUPS } from '../../actions/group.actions';

const initialState = [];
// initial state set as an array,
// instead of doing Object.assign({}, state, etc..).
// It's a cleaner way of using a spread operator.

const groupsList = (state = initialState, action) => {
  switch(action.type) {
    case GET_GROUPS:
      return [ ...action.groups ];
    case LOAD_MORE_GROUPS:
      let newState = {};
      newState = action.groups;

      localStorage.setItem('pageLimit', action.page);
      let noRepeats = state.filter((groups) => {
        Object.keys(action.groups).forEach(function(key) {
          return groups.id !== action.groups[key].id;
        });
      });
      return [...noRepeats];
    default:
      return state;
  }
};

export default groupsList;

