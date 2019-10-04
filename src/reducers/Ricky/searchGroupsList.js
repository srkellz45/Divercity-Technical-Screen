import { SEARCH_GROUPS } from '../../actions/search.actions';
const initialState = [];

const searchGroupsList = (state = initialState, action) => {
  switch (action.type){
    case SEARCH_GROUPS:
      return [ ...action.results ];
    default:
      return state;
  }
};

export default searchGroupsList;