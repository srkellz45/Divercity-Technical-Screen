import Axios from 'axios';
import { url } from '../lib/url';

const getOccupationInterestsURL = `${url}data/occupation_of_interests?page[number]=0&page[size]=30&search_query=a`;
const followOccupationsURL = `${url}data/follow_occupation_of_interest`;
const updateInterestsURL = `${url}users/current/update_interests`;

export const GET_INTERESTS = 'GET_INTERESTS';
export const FOLLOW_INTERESTS = 'FOLLOW_INTERESTS';
export const ERROR = 'ERROR';

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

export const getOccupationInterests = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getOccupationInterestsURL,
      headers: headers()
    })
    .then(response => {
      console.log(response.data.data);
        dispatch({
          type: GET_INTERESTS,
          interests: response.data.data
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

export const followOccupation = (occupationIDS) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: followOccupationsURL,
      data: occupationIDS,
      headers: headers()
    })
    .then(response => {
      console.log(response);
      // dispatch({
      //   type: FOLLOW_INTERESTS,
      //   interests: response.data.data
      // });
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

// followGroup(params) {
//     const { users, group_id, invite_type } = params;
//     return axios({
//       method: 'post',
//       url: `${url }/group_of_interests/${group_id}/follow`,
//       data: {
//         group_invite: {
//           users, // this should be an array with current user...
//           invite_type, // 'in_app_invite'
//           group_id // integer
//         }
//       },
//       headers: headers()
//     });
//   },