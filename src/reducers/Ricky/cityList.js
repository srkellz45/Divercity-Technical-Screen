import { SEARCH_CITY } from '../../actions/onboard.actions';

const initialState = [];

const cityList = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_CITY:
      return [ ...action.results ];
    default:
      return state;
  }
};

export default cityList;