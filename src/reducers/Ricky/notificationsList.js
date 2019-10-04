import { GET_UNREAD_ACTIVITIES, EMPTY_LIST } from '../../actions/notification.actions';
const initialState = [];

const notificationsList = (state = initialState, action) => {
  switch (action.type){
    case GET_UNREAD_ACTIVITIES:
    if(!action.notifications) { return state; }
    let unreadActivities = action.notifications.filter((notification) => {
      if(!notification.attributes.read){
         return notification;
      }});
      return [ ...unreadActivities ];
    case EMPTY_LIST:
      localStorage.setItem("empty", true);
      return state;
    default:
      return state;
  }
};

export default notificationsList;