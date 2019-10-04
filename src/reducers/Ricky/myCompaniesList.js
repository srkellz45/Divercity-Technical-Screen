import { GET_MY_COMPANIES } from '../../actions/company.actions';
const initialState = [];

const myCompaniesList = (state = initialState, action) => {
  switch(action.type) {
    case GET_MY_COMPANIES:
      return [ ...action.companies ];
    default:
      return state;
  }
};

export default myCompaniesList;