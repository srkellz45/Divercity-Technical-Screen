import { GET_QUESTIONS } from '../../actions/group.actions';
import { GET_QUESTIONS_AFTER_REPLY } from '../../actions/question.actions';
const initialState = [];

const questionsList = (state = initialState, action) => {
  switch(action.type) {
    case GET_QUESTIONS:
      return [ ...action.questions ];
    case GET_QUESTIONS_AFTER_REPLY:
      return [ ...action.questions ];
    default:
      return state;
  }
};

export default questionsList;