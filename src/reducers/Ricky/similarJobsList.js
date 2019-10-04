import { GET_SIMILAR_JOBS } from '../../actions/job.actions';

const initialState = [];
// initial state set as an array,
// instead of doing Object.assign({}, state, etc..).
// It's a cleaner way of using a spread operator.

const similarJobsList = (state = initialState, action) => {
  switch(action.type) {
    case GET_SIMILAR_JOBS:
      return [ ...action.similarJobs ];
    default:
      return state;
  }
};

export default similarJobsList;