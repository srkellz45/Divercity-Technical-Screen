import { GET_COMPANY_JOBS, GET_MORE_COMPANY_JOBS } from '../../actions/company.actions';
import { EDIT_JOB } from '../../actions/recruiter.actions.js';
const initialState = [];

const singleCompanyJobList = (state = initialState, action) => {
  switch(action.type) {
    case GET_COMPANY_JOBS:
      return [ ...action.jobs ];
    case GET_MORE_COMPANY_JOBS:
      let newState = {};
      newState = action.jobs;
      localStorage.setItem( 'pageLimit', action.page);
      return [...state, ...newState];
    case EDIT_JOB:
      let editJob = state.filter((job) => {
        return job.id !== action.editedJob.id;
      });
      return [ action.editedJob, ...editJob];
    default:
      return state;
  }
};

export default singleCompanyJobList;