import { GET_LOGOS } from '../../actions/company.actions';
const initialState = [];

const companyLogosList = (state = initialState, action) => {
  switch (action.type){
    case GET_LOGOS:
      return [ ...action.logos ];
    default:
      return state;
  }
};

export default companyLogosList;