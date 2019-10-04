import { GET_APPLICANTS, EMPTY_LIST } from '../../actions/recruiter.actions';
const initialState = [];

const applicantsList = (state = initialState, action) => {
  switch (action.type){
    case GET_APPLICANTS:
      return [ ...action.applicants ];
    case EMPTY_LIST:
      localStorage.setItem("empty", true);
      return state;
    default:
      return state;
  }
};

export default applicantsList;