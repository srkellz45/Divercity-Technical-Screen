import { GET_INDUSTRIES } from '../../actions/industry.actions';

const initialState = [];

const industryList = (state = initialState, action) => {
  switch(action.type) {
    case GET_INDUSTRIES:
      return [ ...action.industries ];
    default:
      return state;
  }
};

export default industryList;