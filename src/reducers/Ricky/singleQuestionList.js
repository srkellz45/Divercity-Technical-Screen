//import { LOAD_QUESTIONS_BY_GROUP } from '../../actions/group.actions';
import { GET_SINGLE_QUESTION } from '../../actions/question.actions';
const initialState = [];

const singleQuestionList = (state = initialState, action) => {
  switch(action.type) {
    // case LOAD_QUESTIONS_BY_GROUP:
    //   return [ ...action.questions ];
    case GET_SINGLE_QUESTION:
      return Object.assign({}, state, action.question);
    default:
      return state;
  }
};

export default singleQuestionList;