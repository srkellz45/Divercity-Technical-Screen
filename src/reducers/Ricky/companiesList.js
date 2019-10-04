import { GET_COMPANIES, GET_MORE_COMPANY_JOBS, LOAD_MORE_COMPANIES } from '../../actions/company.actions';
import { EDIT_JOB } from '../../actions/recruiter.actions.js';
const initialState = [];

const companiesList = (state = initialState, action) => {
  switch(action.type) {
    case GET_COMPANIES:
      return [ ...action.companies ];
    case LOAD_MORE_COMPANIES:
      let newCompanyState = {};
      newCompanyState = action.companies;
      localStorage.setItem('pageLimit', action.page);
      return [...state, ...newCompanyState];
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

export default companiesList;