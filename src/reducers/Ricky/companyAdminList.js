import { GET_COMPANY_ADMINS } from '../../actions/company.actions.js';

const companyAdminList = (state = [], action) => {
  switch(action.type) {
    case GET_COMPANY_ADMINS:
    console.log(action.admins);
      return [ ...action.admins ];
    default:
      return state;
  }
};

export default companyAdminList;