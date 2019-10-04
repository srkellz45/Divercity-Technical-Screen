import { GET_JOB_TYPES } from '../../actions/job.actions';

const initialState = [];

const jobTypeList = (state = initialState, action) => {
  switch(action.type) {
    case GET_JOB_TYPES:
      return [ ...action.jobTypes ];
    default:
      return state;
  }
};

export default jobTypeList;