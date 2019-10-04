import { GET_RECRUITER_JOBS } from '../../actions/job.actions';
const initialState = [];

const recruiterJobsList = (state = initialState, action) => {
  switch(action.type) {
    case GET_RECRUITER_JOBS:
      return [ ...action.jobs ];
    default:
      return state;
  }
};

export default recruiterJobsList;