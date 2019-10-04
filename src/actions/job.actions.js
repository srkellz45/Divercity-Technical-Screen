import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';
import { toast } from "react-toastify";

export const LOAD_JOBS = 'LOAD_JOBS';
export const LOAD_RECOMMENDED_JOBS = 'LOAD_RECOMMENDED_JOBS';
export const LOAD_MORE_JOBS = 'LOAD_MORE_JOBS';
export const LOAD_SINGLE_JOB = 'LOAD_SINGLE_JOB';
export const GET_JOB_TYPES = 'GET_JOB_TYPES';
export const GET_JOB_SKILLS = 'GET_JOB_SKILLS';
export const ADD_JOB = 'ADD_JOB';

export const APPLY = 'APPLY';
export const GET_SIMILAR_JOBS = 'GET_SIMILAR_JOBS';
export const SEARCH_JOBS = 'SEARCH_JOBS';
export const SAVE_JOB = 'SAVE_JOB';
export const GET_SAVED_JOBS = 'GET_SAVED_JOBS';
export const DELETE_SAVED_JOB = 'DELETE_SAVED_JOB';
export const GET_RECRUITER_JOBS = 'GET_RECRUITER_JOBS';
export const EMPTY_LIST = 'EMPTY_LIST';
export const LOAD_APPLICATION_VIEW = 'LOAD_APPLICATION_VIEW';
export const FILTER_JOBS = 'FILTER_JOBS';

export const ERROR = 'ERROR';

const addJobsURL = `${ url }jobs`;

const getJobsURL = `${ url }jobs?page[number]=0&page[size]=10`;
const getRecommendedJobsURL = `${ url }recommenders/jobs?page[number]=0&page[size]=6`;
const loadMoreURL = `${ url }jobs?page[number]=`;
const getSingleJobURL = `${ url }jobs/`;
const getSimilarJobsURL = `${ url }jobs?page[number]=0&page[size]=30&similar_to=`;
const searchJobsURL = `${ url }jobs?page[number]=0&page[size]=10&search_query=`;
const getJobSkillsURL = `${ url }data/job_skills?page[number]=0&page[size]=30`;
const getJobTypesURL = `${url}jobs/job_types`;
const applyJobURL = `${url}jobs/apply`;
const saveJobURL = `${url}jobs/`;
const getSavedJobsURL = `${url}bookmarks?type=Job`;
const getJobsByUserURL = `${url}jobs?user=`;
const getSingleApplication = `${url}jobs/`;
const filterJobsURL = `${url}jobs?page[number]=0&page[size]=10`;

const headers = () => ({
  'Content-Type': 'application/json',
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

export const searchJobs = (page, query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: searchJobsURL + query,
      headers: headers()
    })
    .then(jobs => {
      dispatch({
        type: SEARCH_JOBS,
        jobs: jobs.data.data
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
// creating a GET action that calls all jobs
export const loadJobs = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getJobsURL,
      headers: headers()
      })
    .then(jobs => {
      localStorage.removeItem('filter_empty');
      dispatch({
        type: LOAD_JOBS,
        jobs: jobs.data.data
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

// creating a GET action that calls all jobs
export const loadRecommendedJobs = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getRecommendedJobsURL,
      headers: headers()
      })
    .then(jobs => {
      dispatch({
        type: LOAD_RECOMMENDED_JOBS,
        jobs: jobs.data.data
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
// PAGINATION to GET more jobs and add them to job STATE
export const loadMoreJobs = (page, query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: loadMoreURL + page + `&page[size]=10`,
      headers: headers()
      })
    .then(jobs => {
      dispatch({
        type: LOAD_MORE_JOBS,
        jobs: jobs.data.data,
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
// GET of a SINGLE job for modal view
export const loadSingleJob = (id) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getSingleJobURL + id,
      headers: headers()
      })
    .then(job => {
      dispatch({
        type: LOAD_SINGLE_JOB,
        job: job.data.data
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
// GET of job types (not sure why this is an API call)
// returns "Full Time, Part Time, Internship" etc...
export const loadJobTypes = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getJobTypesURL,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: GET_JOB_TYPES,
        jobTypes: response.data.data
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
// Not really using this yet, once I figure out Dropdown with "add new"
// For NewJob container
export const loadJobSkills = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getJobSkillsURL + query,
      headers: headers()
    })
    .then(response => {
      console.log(response);
      dispatch({
        type: GET_JOB_SKILLS,
        jobSkills: response.data.data
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
//CREATE(POST) new job
export const addJob = (newJob, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: addJobsURL,
      headers: headers(),
      data: { "job": newJob }
    })
    .then(response => {
      console.log(response);
       dispatch({
         type: ADD_JOB,
         newJob: response.data.data
      });
      if(response.status === 422) {
          toast.error(`Something went wrong`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
      history.push(`/jobs`);
      localStorage.setItem('hasPostedJob', true);
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

// apply (POST) to Job, sends data to recruiter DB
export const applyJob = (job, resume, cover) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: applyJobURL,
      headers: headers(),
      data: { "application": {
        'job_id': job,
        'user_document_id': resume,
        'cover_letter': cover
        }
      }
    })
    .then(response => {
      if(response.status === 200){
        dispatch({
         type: APPLY,
         apply: response.data.data
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
// Gets jobs similar to JOB_ID
export const getSimilarJobs = (id) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getSimilarJobsURL + id,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: GET_SIMILAR_JOBS,
        similarJobs: response.data.data
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
// saves (POST) job to bookmarks folder
export const saveJob = (id) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: saveJobURL + id + `/bookmark`,
      headers: headers(),
      data: { 'job': id }
    })
    .then(response => {
      if(response.status === 200){
        dispatch({
         type: SAVE_JOB,
         saveJob: response.data.data
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
// retrieve SAVED jobs, also have to specify "Job" in query
export const getSavedJobs = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getSavedJobsURL,
      headers: headers()
    })
    .then(response => {
      if(response.data.data.length === 0) {
        dispatch({
          type: EMPTY_LIST,
          savedJobs: response.data.data
        });
      }
      if(response.data.data.length > 0) {
        dispatch({
          type: GET_SAVED_JOBS,
          savedJobs: response.data.included
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

export const removeSavedJob = (jobID) => {
  return (dispatch) => {
    return Axios({
      method: 'delete',
      url: saveJobURL + jobID + `/remove_bookmark`,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: DELETE_SAVED_JOB,
        deleteJob: response.data.data
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

export const getJobsByUser = (userID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getJobsByUserURL + userID,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_RECRUITER_JOBS,
          jobs: response.data.data
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

// GET of a SINGLE application for job-seeker for modal view
export const getApplication = (id) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getSingleApplication + id + `/application`,
      headers: headers()
      })
    .then(application => {
      dispatch({
        type: LOAD_APPLICATION_VIEW,
        application: application.data.data
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

// creating a GET action FOR FILTRATION
export const filterJobs = (link) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: filterJobsURL + link,
      headers: headers()
      })
    .then(jobs => {
      if(jobs.data.data.length === 0) {
        dispatch({
          type: EMPTY_LIST,
          jobs: jobs.data.data
        });
      } else { localStorage.removeItem('filter_empty'); }
      dispatch({
        type: FILTER_JOBS,
        jobs: jobs.data.data
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