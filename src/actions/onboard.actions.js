import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';

const getSchoolsURL = `${url}schools?page[number]=0&page[size]=10&search_query=`;
const searchStudentMajorURL = `${url}data/student_majors?page[number]=0&page[size]=30&search_query=`;
const getStudentMajorsURL = `${url}data/student_majors`;
const searchCitiesURL = `${url}data/cities?page[number]=0&page[size]=30&search_query=`;
const searchCountryURL = `${url}data/countries?page[number]=0&page[size]=30&search_query=`;
const uploadPictureURL = `${url}users/avatar_upload`;
const updateProfileURL = `${url}users/`;
const addCityURL = `${url}data/add_city`;
const occupationURL = `${url}data/occupation_of_interests?page[number]=0&page[size]=30&search_query=`;
const createSchoolURL = `${url}data/add_school/`;
const addSchoolURL = `${url}users/`;
const followStudentMajorURL = `${url}data/follow_student_major`;

export const GET_USER = 'GET_USER';
export const GET_SCHOOLS = 'GET_SCHOOLS';
export const SEARCH_MAJOR = 'SEARCH_MAJOR';
export const SEARCH_CITY = 'SEARCH_CITY';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const UPLOAD_PHOTO = 'UPLOAD_PHOTO';
export const GET_OCCUPATIONS = 'GET_OCCUPATIONS';

export const ERROR = 'ERROR';

const headers = () => ({
  'Content-Type': 'application/json',
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

export const loadSchools = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getSchoolsURL + query,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_SCHOOLS,
          schools: response.data.data
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

export const loadOccupations = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: occupationURL + query,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_OCCUPATIONS,
          occupations: response.data.data
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
export const loadMajors = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getStudentMajorsURL,
      headers: headers()
    })
    .then(response => {
       //  dispatch({
       //    type: GET_OCCUPATIONS,
       //    occupations: response.data.data
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
export const searchMajor = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: searchStudentMajorURL + query,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: SEARCH_MAJOR,
        results: response.data.data
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
export const searchCity = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: searchCitiesURL + query,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: SEARCH_CITY,
        results: response.data.data
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
export const searchCountry = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: searchCountryURL + query,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: SEARCH_COUNTRY,
        results: response.data.data
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
export const uploadProfilePicture = (image) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: uploadPictureURL,
      headers: headers(),
      data: { "avatar": image }
    })
    .then((response) => {
      dispatch({
        type: UPLOAD_PHOTO,
        uploadPhoto: response.data
      });
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

export const updateProfile = (data, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: updateProfileURL + ID,
      headers: headers(),
      data: data
    })
    .then((response) => {
      console.log(response);
      let accountType = response.data.data.attributes.account_type;
      dispatch({
        type: GET_USER,
        user: response.data.data
      });
      switch (accountType) {
        case 'entrepreneur':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/work/3`);
          }
        break;
        case 'job_seeker':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/work/3`);
          }
        break;
        case 'student':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/info/2`);
          }
        break;
        case 'recruiter':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/groups`);
          }
        break;
        case 'professional':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/groups`);
          }
        break;
        case 'hiring_manager':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/groups`);
          }
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
export const addWork = (data, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: updateProfileURL + ID,
      headers: headers(),
      data: data
    })
    .then((response) => {
    let accountType = response.data.data.attributes.account_type;
      dispatch({
        type: GET_USER,
        user: response.data.data
      });
      switch (accountType) {
        case 'entrepreneur':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/info/3`);
          }
        break;
        case 'job_seeker':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/info/3`);
          }
        break;
        // case 'student':
        //   if(response.status === 200) {
        //     history.push(`/${ID}/onboarding/info/3`);
        //   }
        // break;
        case 'professional':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/info/1`);
          }
        break;
        case 'recruiter':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/info/2`);
          }
        break;
        case 'hiring_manager':
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/info/2`);
          }
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
export const addPrivateInfo = (data, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: updateProfileURL + ID,
      headers: headers(),
      data: data
    })
    .then((response) => {
      if(response.status === 200) {
        history.push(`/${ID}/onboarding/groups`);
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
export const addSchool = (data, ID, majors) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: addSchoolURL + ID,
      headers: headers(),
      data: data
    })
    .then((response) => {
      if(response.status === 200) {
        return Axios({
          method: 'post',
          url: followStudentMajorURL,
          headers: headers(),
          data: { "major_ids": [parseInt(majors)] }
        })
        .then((response) => {
          if(response.status === 200) {
            history.push(`/${ID}/onboarding/info/3`);
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: ERROR,
            error: 'Profile Failed 2 update'
          });
        });
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

export const addCity = (data) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: addCityURL,
      headers: headers(),
      data: {"name": "San Jose", "country_name": "United States"}
    })
    .then((response) => {
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'failed 2 add city'
      });
    });
  };
};

export const createSchool = (school, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: createSchoolURL,
      headers: headers(),
      data:
        {
            "school_name": "University of Hawaii at Manoa",
          }
    })
    .then(response => {
      console.log(response);
      //  dispatch({
      //    type: ADD_COMPANY,
      //    newCompany: response.data.data
      // });
      //  toast.success(`${response.data.data.attributes.name} successfully created!`, {
      //   position: toast.POSITION.TOP_CENTER,
      //   hideProgressBar: true,
      // });
      //history.push('/jobs');
      // PUSH to NEW COMPANY PAGE /jobs/companies/{response.data.data.company.id}
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};