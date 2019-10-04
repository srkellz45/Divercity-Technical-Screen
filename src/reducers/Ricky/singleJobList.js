import { LOAD_SINGLE_JOB } from '../../actions/job.actions';

const initialState = [];
// initial state set as an array,
// instead of doing Object.assign({}, state, etc..).
// It's a cleaner way of using a spread operator.

const singleJobList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SINGLE_JOB:
    return Object.assign({}, state, action.job);
    default:
      return state;
  }
};

export default singleJobList;