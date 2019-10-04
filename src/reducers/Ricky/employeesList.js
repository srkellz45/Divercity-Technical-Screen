import { GET_EMPLOYEES } from '../../actions/company.actions';

const initialState = [];

const employeesList = (state = initialState, action) => {
  switch(action.type) {
    case GET_EMPLOYEES:
      return [ ...action.employees ];
    default:
      return state;
  }
};

export default employeesList;