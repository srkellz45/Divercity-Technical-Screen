import { GET_COMPANY_SIZES } from '../../actions/company.actions';

const initialState = [];

const companySizeList = (state = initialState, action) => {
  switch(action.type) {
    case GET_COMPANY_SIZES:
      return [ ...action.companySizes ];
    default:
      return state;
  }
};

export default companySizeList;