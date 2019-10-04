import { GET_RECOMMENDED_USERS } from '../../actions/user.actions';
import { FOLLOW_REC_USER } from '../../actions/connection.actions';
import { toast } from "react-toastify";
const initialState = [];

const recommendedUsersList = (state = initialState, action) => {
  switch(action.type) {
    case GET_RECOMMENDED_USERS:
      return [ ...action.recUsers ];
    case FOLLOW_REC_USER:
      toast.success(`Connection Request Sent`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      return action.recUsers;
    default:
      return state;
  }
};

export default recommendedUsersList;