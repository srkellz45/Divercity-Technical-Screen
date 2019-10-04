import { SEARCH_MAJOR } from '../../actions/onboard.actions';

const initialState = [];

const majorList = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MAJOR:
      return [ ...action.results ];
    default:
      return state;
  }
};

export default majorList;