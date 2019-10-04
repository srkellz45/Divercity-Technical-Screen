import { SEARCH_COUNTRY } from '../../actions/onboard.actions';

const initialState = [];

const countryList = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_COUNTRY:
      return [ ...action.results ];
    default:
      return state;
  }
};

export default countryList;