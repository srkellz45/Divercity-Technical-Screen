import { LOAD_RECOMMENDED_JOBS } from '../../actions/job.actions';

const initialState = [];

const recommendedJobsList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_RECOMMENDED_JOBS:
      return [ ...action.jobs ];
    default:
      return state;
  }
};

export default recommendedJobsList;