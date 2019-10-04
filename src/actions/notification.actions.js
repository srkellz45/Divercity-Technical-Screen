import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';

const activityURL = `${url}activity_records`;

export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const GET_UNREAD_ACTIVITIES = 'GET_UNREAD_ACTIVITIES';
export const EMPTY_LIST = 'EMPTY_LIST';
export const ERROR = 'ERROR';

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

export const getActivities = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: activityURL,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: GET_ALL_ACTIVITIES,
        notifications: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const getUnreadActivities = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: activityURL,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: GET_UNREAD_ACTIVITIES,
        notifications: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const markReadActivities = (ids) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: activityURL + `/mark_read`,
      data: { "data" :
              [ { "type": "activity_records",
                  "record_ids": ids } ]
            },
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: GET_UNREAD_ACTIVITIES,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};


