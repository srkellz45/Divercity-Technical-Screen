import { FOLLOW_USER, GET_ALL_USERS, GET_MORE_USERS } from '../../actions/connection.actions';
import { toast } from "react-toastify";
const initialState = [];

const allUsersList = (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_USERS:
      return [ ...action.users ];
    case GET_MORE_USERS:
      let newState = {};
      newState = action.users;
      localStorage.setItem('pageLimit', action.page);
      return [...state, ...newState];
    case FOLLOW_USER:
      toast.success(`Connection Request Sent`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      return [ ...state ];
    default:
      return state;
  }
};

export default allUsersList;