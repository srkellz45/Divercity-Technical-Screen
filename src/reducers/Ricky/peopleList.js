import { GET_MORE_PEOPLE } from '../../actions/user.actions';
import { FOLLOW_PEOPLE, GET_PEOPLE } from '../../actions/connection.actions';
import { toast } from "react-toastify";
const initialState = [];

const peopleList = (state = initialState, action) => {
  switch(action.type) {
    case GET_PEOPLE:
      return [ ...action.recUsers ];
    case GET_MORE_PEOPLE:
      let newState = {};
      newState = action.recUsers;
      localStorage.setItem('pageLimit', action.page);
      return [...state, ...newState];
    case FOLLOW_PEOPLE:
      toast.success(`Connection Request Sent`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      return state;
    default:
      return state;
  }
};

export default peopleList;