import { GET_EXPERIENCE, ADD_EXPERIENCE, EDIT_EXPERIENCE, DELETE_EXPERIENCE } from '../../actions/user.actions';

const initialState = [];

const experienceList = (state = initialState, action) => {
  switch(action.type) {
    case GET_EXPERIENCE:
      return [ ...action.experience ];
    case ADD_EXPERIENCE:
      return [ ...state, action.experience];
    case EDIT_EXPERIENCE:
      let editedExperience = state.filter((experience) => {
        return experience.id !== action.experience.id;
      });
      return [ ...editedExperience, action.experience ];
    case DELETE_EXPERIENCE:
      let removedExperience = state.filter((experience) => {
        return experience.id !== action.experience.id;
      });
    return removedExperience;
    default:
      return state;
  }
};

export default experienceList;