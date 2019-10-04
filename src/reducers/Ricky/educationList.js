import { GET_EDUCATION, ADD_EDUCATION, EDIT_EDUCATION, DELETE_EDUCATION } from '../../actions/user.actions';

const initialState = [];

const educationList = (state = initialState, action) => {
  switch(action.type) {
    case GET_EDUCATION:
      return [ ...action.education ];
    case ADD_EDUCATION:
      return [ ...state, action.education];
    case EDIT_EDUCATION:
      let editedEducation = state.filter((education) => {
        return education.id !== action.education.id;
      });
      return [ ...editedEducation, action.education ];
    case DELETE_EDUCATION:
      let removedEducation = state.filter((education) => {
        return education.id !== action.education.id;
      });
    return removedEducation;
    default:
      return state;
  }
};

export default educationList;