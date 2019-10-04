import {
  LOAD_JOBS,
  ADD_JOB,
  LOAD_MORE_JOBS,
  SEARCH_JOBS,
  FILTER_JOBS,
  EMPTY_LIST
} from '../../actions/job.actions';
import { EDIT_JOB } from '../../actions/recruiter.actions.js';

const initialState = [];
// initial state set as an array,
// instead of doing Object.assign({}, state, etc..).
// It's a cleaner way of using a spread operator.

const jobsList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_JOBS:
      return [ ...action.jobs ];
    case LOAD_MORE_JOBS:
      let newState = {};
      newState = action.jobs;
      localStorage.setItem('pageLimit', action.page);
      return [...state, ...newState];
    case ADD_JOB:
      return [ ...state, action.newJob ];
    case SEARCH_JOBS:
      return [ ...action.jobs ];
    case FILTER_JOBS:
      return [ ...action.jobs ];
    case EDIT_JOB:
      let editJob = state.filter((job) => {
        return job.id !== action.editedJob.id;
      });
      return [ action.editedJob, ...editJob];
    case EMPTY_LIST:
      localStorage.setItem("filter_empty", true);
      return state;
    default:
      return state;
  }
};

export default jobsList;