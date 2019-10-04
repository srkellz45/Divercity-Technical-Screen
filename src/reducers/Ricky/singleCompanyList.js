import { GET_SINGLE_COMPANY } from '../../actions/company.actions';

const initialState = [];

const singleCompanyList = (state = initialState, action) => {
  switch(action.type) {
    case GET_SINGLE_COMPANY:
      return [ action.company ];
    default:
      return state;
  }
};

export default singleCompanyList;