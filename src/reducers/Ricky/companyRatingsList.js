import { GET_RATINGS, ADD_USER_RATING } from '../../actions/company.actions';

const initialState = [];

const companyRatingsList = (state = initialState, action) => {
  switch(action.type) {
    case GET_RATINGS:
      return [ action.ratings ];
    case ADD_USER_RATING:
      return [ ...state, action.review];
    default:
      return state;
  }
};

export default companyRatingsList;