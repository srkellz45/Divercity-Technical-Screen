import { GET_OCCUPATIONS } from '../../actions/onboard.actions';

const initialState = [];

const occupationsList = (state = initialState, action) => {
  switch(action.type) {
    case GET_OCCUPATIONS:
      return [ ...action.occupations ];
    default:
      return state;
  }
};

export default occupationsList;