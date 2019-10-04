import { GET_ANSWERS, EMPTY_LIST, GET_SINGLE_QUESTION_AFTER_REPLY } from '../../actions/question.actions';
const initialState = [];

const answersList = (state = initialState, action) => {
  switch (action.type){
    case GET_ANSWERS:
      return [ ...action.answers ];
    case GET_SINGLE_QUESTION_AFTER_REPLY:
      return [ action.answers, ...state ];
    case EMPTY_LIST:
      localStorage.setItem("empty", true);
      return state;
    default:
      return state;
  }
};

export default answersList;