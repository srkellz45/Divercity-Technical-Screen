import { GET_SCHOOLS } from '../../actions/onboard.actions';

const initialState = [];

const schoolsList = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHOOLS:
      return [ ...action.schools ];
    default:
      return state;
  }
};

export default schoolsList;