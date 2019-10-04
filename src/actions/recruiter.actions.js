import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';

const jobsURL = `${url}jobs/`;
const myJobsURL = `${url}jobs?user=`;
const editJobsURL = `${url}jobs/`;

export const GET_APPLICANTS = 'GET_APPLICANTS';
export const GET_MY_JOBS = 'GET_MY_JOBS';
export const GET_MORE_JOBS = 'GET_MORE_JOBS';
export const PUBLISH_JOB = 'PUBLISH_JOB';
export const UN_PUBLISH_JOB = 'UN_PUBLISH_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const EDIT_JOB = 'EDIT_JOB';
export const EMPTY_LIST = 'EMPTY_LIST';
export const ERROR = 'ERROR';

  const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});


export const getJobApplicants = (id) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: jobsURL + id + `/applicants`,
      headers: headers()
    })
    .then(response => {
      if(response.data.data.length === 0) {
        dispatch({
          type: EMPTY_LIST,
          applicants: response.data.data
        });
      }
      if(response.data.data.length > 0) {
        dispatch({
          type: GET_APPLICANTS,
          applicants: response.data.data
        });
      }
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

// GET MY JOBS THAT I HAVE POSTED
export const getMyJobs = (id) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: myJobsURL + id + `&page[number]=0&page[size]=10`,
      headers: headers()
    })
    .then(response => {
      if(response.data.data.length > 0) {
        localStorage.setItem('hasPostedJob', true);
      }
        dispatch({
          type: GET_MY_JOBS,
          myJobs: response.data.data
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
export const editJob = (newJobInfo, jobID) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: editJobsURL + jobID,
      headers: headers(),
      data: newJobInfo
    })
    .then(response => {
      if(response.status === 200){
         dispatch({
           type: EDIT_JOB,
           editedJob: response.data.data
        });
      }
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
// PAGINATION to GET more jobs and add them to job STATE
export const loadMoreJobs = (id, page, query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: myJobsURL + id + `&page[number]=` + page + `&page[size]=5`,
      headers: headers()
      })
    .then(jobs => {
      dispatch({
        type: GET_MORE_JOBS,
        myJobs: jobs.data.data,
        page: jobs.data.meta.total_pages
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
// PUBLISH UNPUBLISH
export const publishUnpublish = (jobID, action, userID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: jobsURL + jobID + `/perform`,
      headers: headers(),
      data: { "intent": action }
    })
    .then(response => {
      if(response.data.data.attributes.publishable) {
         dispatch({
           type: PUBLISH_JOB,
           publish: response.data.data
        });
        //history.push(`/${userID}/user/jobs`);
      }
      if(!response.data.data.attributes.publishable) {
         dispatch({
           type: UN_PUBLISH_JOB,
           unPublish: response.data.data
        });
      }
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const deleteJob = (jobID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: jobsURL + jobID + `/perform`,
      headers: headers(),
      data: { "intent": "delete" }
    })
    .then(response => {
       dispatch({
         type: DELETE_JOB,
         deletedJob: response.data.data
      });
      //history.push(`/${userID}/user/jobs`);
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

