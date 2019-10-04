import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';

export const LOAD_JOBS = 'LOAD_JOBS';
export const ERROR = 'ERROR';

const addIntegrationURL = `${ url }integrations`;
const pullJobsURL = `${ url }integrations/gh_pull_jobs`;

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});


// add integration
export const addIntegration = (api, job_employer_id) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: addIntegrationURL,
      headers: headers(),
      data: { "integrations": {
        "itype": "greenhouse",
        "authentication": api,
        "job_employer_id": job_employer_id
        }
      }
    })
    .then(response => {
      console.log(response);
       dispatch({
         type: LOAD_JOBS,
         integrationResponse: response.data.data
      });
      history.push(`/jobs`);
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};



// export const pullJobsGreenhouse = (ID) => {
//   return (dispatch) => {
//     return Axios({
//       method: 'get',
//       url: myFollowersURL + ID + `/connections`,
//       headers: headers()
//     })
//     .then(response => {
//       console.log(response);
//        //  dispatch({
//        //    type: GET_CONNECTIONS,
//        //    connections: response.data.data,
//        //    id: ID,
//        // });
//     })
//     .catch(err => {
//       toast.error(`Something went wrong`, {
//         position: toast.POSITION.TOP_CENTER,
//         hideProgressBar: true,
//         pauseOnHover: true,
//       });
//       console.log(err);
//       dispatch({
//         type: ERROR,
//         error: err
//       });
//     });
//   };
// };