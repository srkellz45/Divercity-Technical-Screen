import { LOAD_QUESTIONS_BY_GROUP, CREATE_NEW_GROUP } from '../../actions/group.actions';
import { GET_SINGLE_GROUP_AFTER_REPLY } from '../../actions/question.actions';
const initialState = [];

const singleGroupQuestionsList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_QUESTIONS_BY_GROUP:
      return [ ...action.questions ];
    case GET_SINGLE_GROUP_AFTER_REPLY:
      return [ ...action.questions ];
    case CREATE_NEW_GROUP:
      return [ ...action.questions ];
    default:
      return state;
  }
};

export default singleGroupQuestionsList;