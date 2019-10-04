import { LOAD_RECOMMENDED_GROUPS, FOLLOW_REC_GROUP } from '../../actions/group.actions';
import { toast } from "react-toastify";
const initialState = [];

const recommendedGroupsList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_RECOMMENDED_GROUPS:
      return [ ...action.groups ];
    case FOLLOW_REC_GROUP:
      toast.success(`Group Joined `, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      return [ ...action.recGroup ];
    default:
      return state;
  }
};

export default recommendedGroupsList;