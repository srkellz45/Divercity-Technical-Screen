import { SEARCH_JOBS } from '../../actions/job.actions';

const initialState = [];
// initial state set as an array,
// instead of doing Object.assign({}, state, etc..).
// It's a cleaner way of using a spread operator.

const searchJobsList = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_JOBS:
      return [ ...action.jobs ];
    default:
      return state;
  }
};

export default searchJobsList;