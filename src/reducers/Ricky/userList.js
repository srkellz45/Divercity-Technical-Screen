import { GET_USER, EDITING, ADD_SKILLS } from '../../actions/user.actions';
const initialState = [];

const userList = (state = initialState, action) => {
  switch (action.type){
    case GET_USER:
      return Object.assign({}, state, action.user);
    case EDITING:
      if (state.id === action.id) {
        return Object.assign({}, state, {
          isEditing : action.editing
        });
      }
      return Object.assign({}, state, {
        isEditing : action.editing
      });
    case ADD_SKILLS:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
};

export default userList;