import { LOAD_SINGLE_GROUP, FOLLOW_GROUP, UN_FOLLOW_GROUP, CREATE_NEW_GROUP, EDIT_GROUP, REQUEST_GROUP_ACCESS } from '../../actions/group.actions';
import { toast } from "react-toastify";
const initialState = [];

const singleGroupList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SINGLE_GROUP:
      return Object.assign({}, state, action.group);
    case FOLLOW_GROUP:
      toast.success(`Group Joined`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      return Object.assign({}, state, action.group);
    case UN_FOLLOW_GROUP:
      toast.success(`Group Left`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      return Object.assign({}, state, action.group);
    case REQUEST_GROUP_ACCESS:
      toast.success(`A request has been sent to join this group. You will be notified when your request is accepted`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          pauseOnHover: true,
        });
      return Object.assign({}, state, action.group);
    case EDIT_GROUP:
      return Object.assign({}, state, action.group);
    default:
      return state;
  }
};

export default singleGroupList;