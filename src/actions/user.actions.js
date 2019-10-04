import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';
import { toast } from "react-toastify";

export const GET_USER = 'GET_USER';
export const GET_RECOMMENDED_USERS = 'GET_RECOMMENDED_USERS';
export const GET_EXPERIENCE = 'GET_EXPERIENCE';
export const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
export const EDIT_EXPERIENCE = 'EDIT_EXPERIENCE';
export const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE';
export const GET_EDUCATION = 'GET_EDUCATION';
export const ADD_EDUCATION = 'ADD_EDUCATION';
export const EDIT_EDUCATION = 'EDIT_EDUCATION';
export const DELETE_EDUCATION = 'DELETE_EDUCATION';
export const GET_PEOPLE = 'GET_PEOPLE';
export const GET_MORE_PEOPLE = 'GET_MORE_PEOPLE';
//export const FOLLOW_PEOPLE = 'FOLLOW_PEOPLE';
export const ADD_SKILLS = 'ADD_SKILLS';
export const VIEW_OTHER_USER = 'VIEW_OTHER_USER';

export const SEARCH_USERS ='SEARCH_USERS';
export const SEARCH_USER_MENTION = 'SEARCH_USER_MENTION';
export const EDITING ='EDITING';
export const RESUME_SUCCESS = 'RESUME_SUCCESS';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const DELETE_RESUME = 'DELETE_RESUME';
export const GET_DOCUMENTS = 'GET_DOCUMENTS';

export const GET_MY_APPLICATIONS = 'GET_MY_APPLICATIONS';
export const CANCEL_APPLICATION = 'CANCEL_APPLICATION';
export const ERROR = 'ERROR';

const getUserURL = `${url}users/`;
const getRecommendedUsersURL = `${url}recommenders/users?page[number]=0&page[size]=4`;

//const followUserURL = `${url}users/follow`;

const getMoreConnectionsURL = `${url}recommenders/users?page[number]=`;
//`${url}recommenders/users?page[number]=0&page[size]=3`;
const searchUserURL = `${url}users?search_query=`;
const updateProfileURL = `${url}users/`;
const experienceURL = `${url}users/`;
const educationURL = `${url}users/`;
const addSkillsURL = `${url}users/`;
const documentsURL = `${ url }user_documents`;
const deleteResumeURL = `${url}user_documents/`;
const myApplicationsURL = `${url}jobs/applications`;
const cancelApplicationURL = `${url}jobs/`;

const setPasswordURL = `${url}users/current/set_password`;
const updatePasswordURL = `${url}users/`;

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

export const getOtherUser = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getUserURL + ID,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: VIEW_OTHER_USER,
          user: response.data.data
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
export const getUser = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getUserURL + ID,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_USER,
          user: response.data.data
       });
      localStorage.setItem('role', response.data.data.attributes.account_type);
      localStorage.setItem('image', response.data.data.attributes.avatar_thumb);
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
export const addExperience = (experience, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: experienceURL + ID + `/experiences`,
      headers: headers(),
      data: {
       "experience": {
        "job_employer_id": parseInt(experience.job_employer_id),
        "job_start": experience.job_start,
        "job_end": experience.job_end,
        "is_present": experience.is_present,
        "experience_details": "Something nice is going on here",
        "world_country_id": 20,
        "world_city_id": 4,
        "location_words": experience.location_words,
        "role": experience.role
        }
      }
    })
    .then((response) => {
      if(response.status === 200) {
        dispatch({
          type: ADD_EXPERIENCE,
          experience: response.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Experience Failed to Add'
      });
    });
  };
};
export const editExperience = (experience, experienceID, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: experienceURL + ID + '/experiences/' + experienceID,
      headers: headers(),
      data: {
       "experience": experience
      }
    })
    .then((response) => {
      console.log(response.status);
      if(response.status === 200) {
        dispatch({
          type: EDIT_EXPERIENCE,
          experience: response.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Experience Failed to Add'
      });
    });
  };
};
export const deleteExperience = (experienceID, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'delete',
      url: experienceURL + ID + /experiences/ + experienceID,
      headers: headers()
    })
    .then((response) => {
      if(response.status === 200) {
        dispatch({
          type: DELETE_EXPERIENCE,
          experience: response.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Experience Failed to Add'
      });
    });
  };
};
export const addEducation = (education, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: educationURL + ID + `/educations`,
      headers: headers(),
      data: {
       "education": {
        "school_id": parseInt(education.school_id),
        "qualification": education.qualification,
        "start_year": education.start_year,
        "end_year": education.end_year,
        }
      }
    })
    .then((response) => {
      if(response.status === 200) {
        dispatch({
          type: ADD_EDUCATION,
          education: response.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Education Failed to Add'
      });
    });
  };
};
export const getEducation = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: educationURL + ID + `/educations`,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_EDUCATION,
          education: response.data.data
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
export const editEducation = (education, educationID, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: educationURL + ID + "/educations/" + educationID,
      headers: headers(),
      data: {
       "education": education
      }
    })
    .then((response) => {
      if(response.status === 200) {
        dispatch({
          type: EDIT_EDUCATION,
          education: response.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Education Failed to edit'
      });
    });
  };
};
export const deleteEducation = (educationID, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'delete',
      url: educationURL + ID + "/educations/" + educationID,
      headers: headers()
    })
    .then((response) => {
      if(response.status === 200) {
        dispatch({
          type: DELETE_EDUCATION,
          education: response.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Education Failed to Delete'
      });
    });
  };
};
export const addSkills = (skills, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: addSkillsURL + ID,
      headers: headers(),
      data: {
        "user": {
           "skills": skills
         }
      }
    })
    .then((response) => {
      if(response.status === 200) {
        dispatch({
          type: ADD_SKILLS,
          user: response.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Experience Failed to Add'
      });
    });
  };
};
export const getExperience = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: experienceURL + ID + `/experiences`,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_EXPERIENCE,
          experience: response.data.data
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
export const getRecommendedUsers = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getRecommendedUsersURL,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_RECOMMENDED_USERS,
          recUsers: response.data.data
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
// PAGINATION to GET more connections and add them to job STATE
export const getMoreConnections = (page, query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getMoreConnectionsURL + page + `&page[size]=20`,
      headers: headers()
      })
    .then(connections => {
      if(connections.data.data.length === 0) {
        localStorage.setItem('connectionsEmpty', true);
      }
      dispatch({
        type: GET_MORE_PEOPLE,
        recUsers: connections.data.data,
        page: connections.data.meta.total_pages
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

export const updateUserType = (data, ID) => {
  let userType =
        { "user": {
            "id": ID,
            "account_type": data
          }
        };
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: updateProfileURL + ID,
      headers: headers(),
      data: userType
    })
    .then((response) => {
    let accountType = response.data.data.attributes.account_type;
      dispatch({
        type: GET_USER,
        user: response.data.data
      });
      switch (accountType) {
        case 'student':
          history.push(`/${ID}/onboarding/resume/3`);
          localStorage.setItem('type', 'student');
        break;
        case 'recruiter':
          history.push(`/${ID}/onboarding/work/2`);
          localStorage.setItem('type', 'recruiter');
        break;
        case 'hiring_manager':
          history.push(`/${ID}/onboarding/work/2`);
          localStorage.setItem('type', 'hiring_manager');
        break;
        case 'professional':
          history.push(`/${ID}/onboarding/work/1`);
          localStorage.setItem('type', 'professional');
        break;
        case 'job_seeker':
          history.push(`/${ID}/onboarding/resume/3`);
          localStorage.setItem('type', 'job_seeker');
        break;
        case 'entrepreneur':
          history.push(`/${ID}/onboarding/resume/3`);
          localStorage.setItem('type', 'entrepreneur');
        break;
        default:
        break;
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Profile Failed 2 update'
      });
    });
  };
};

export const searchUser = (page, query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: searchUserURL + query,
      headers: headers(),
    })
    .then(response => {
      if(response.status === 200) {
        history.push(`/results/` + query);
        dispatch({
          type: SEARCH_USERS,
          results: response.data.data
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

export const searchUserMention = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: searchUserURL + query,
      headers: headers(),
    })
    .then(response => {
      if(response.status === 200) {
        dispatch({
          type: SEARCH_USER_MENTION,
          results_usr: response.data.data
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

export const updateUserProfile = (data, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: updateProfileURL + ID,
      headers: headers(),
      data: data
    })
    .then((response) => {
      dispatch({
        type: GET_USER,
        user: response.data.data
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Profile Failed 2 update'
      });
    });
  };
};

export const addFile = (file, name) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: documentsURL,
      headers: headers(),
      data: {
        "document": {
          "name": name,
          "document": file
        }
      }
    })
    .then((response) => {
      if(response.status === 200) {
        dispatch({
          type: SHOW_MODAL,
          modalType: RESUME_SUCCESS,
          modalProps: response.data.data
        });
        //history.push(`/${localStorage.id}/user/`);
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Image Failed to Upload'
      });
    });
  };
};

export const deleteResume = (id) => {
  return (dispatch) => {
    return Axios({
      method: 'delete',
      url: deleteResumeURL + id,
      headers: headers()
    })
    .then(response => {
      if(response.status === 200) {
        dispatch({
          type: DELETE_RESUME,
          resumeID: id
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

export const getDocuments = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: documentsURL,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_DOCUMENTS,
          documents: response.data.data
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


//Switches flag to inform front end of change/edit
export const makeUserEditable = (id, editing) => {
  return (dispatch) => {
    return dispatch({
      type: EDITING,
      id: id,
      editing: editing
    });
  };
};


export const getMyApplications = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: myApplicationsURL,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_MY_APPLICATIONS,
          applications: response.data.data
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

export const cancelApplication = (id) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: cancelApplicationURL + id + `/apply_edit`,
      headers: headers(),
      data: {
        "application": {"canceled": true}
      }
    })
    .then(response => {
      if(response.status === 200) {
        dispatch({
          type: CANCEL_APPLICATION,
          applicationID: id
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


// export const followPeople = (ID) => {
//   return (dispatch) => {
//     return Axios({
//       method: 'post',
//       url: followUserURL,
//       data: { "user_id": ID },
//       headers: headers()
//     })
//     .then(response => {
//       if(response.status === 201) {
//         return Axios({
//           method: 'get',
//           url: getMoreConnectionsURL,
//           headers: headers()
//         })
//         .then(response => {
//           dispatch({
//             type: FOLLOW_PEOPLE,
//             recUsers: response.data.data
//           });
//         });
//       }
//     })
//     .catch(err => {
//       console.log(err, 'error');
//       dispatch({
//         type: ERROR,
//         error: err
//       });
//     });
//   };
// };

export const setPassword = (password) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: setPasswordURL,
      data: { "password": password },
      headers: headers()
    })
    .then(response => {
      if(response.status === 200) {
        toast.success(`Password Set!`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    })
    .catch(err => {
      console.log(err, 'error');
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const updatePassword = (password, id) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: updatePasswordURL + id + `/update_password`,
      headers: headers(),
      data: password
    })
    .then(response => {
      if(response.status === 200) {
        toast.success(`Password Changed Successfully`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
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