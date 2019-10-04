import { LOAD_APPLICATION_VIEW } from '../../actions/job.actions';

const initialState = [];
// initial state set as an array,
// instead of doing Object.assign({}, state, etc..).
// It's a cleaner way of using a spread operator.

const singleApplicationList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_APPLICATION_VIEW:
    return Object.assign({}, state, action.application);
    default:
      return state;
  }
};

export default singleApplicationList;