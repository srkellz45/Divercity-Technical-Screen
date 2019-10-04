import { GET_ALL_ACTIVITIES, EMPTY_LIST } from '../../actions/notification.actions';
const initialState = [];

const allNotificationsList = (state = initialState, action) => {
  switch (action.type){
    case GET_ALL_ACTIVITIES:
      return [ ...action.notifications ];
    case EMPTY_LIST:
      localStorage.setItem("empty", true);
      return state;
    default:
      return state;
  }
};

export default allNotificationsList;