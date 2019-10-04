import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';
import { toast } from "react-toastify";

const companyURL = `${url}job_employers`;
const getCompanySizesURL = `${url}data/company_sizes`;
const getJobsByCompanyURL = `${url}jobs?company_id=`;
const getMoreJobsByCompanyURL = `${url}jobs?page[number]=`;
const getCompaniesURL = `${url}job_employers?page[number]=0&page[size]=20`;
const searchCompaniesURL = `${url}job_employers?page[number]=0&page[size]=20&search_query=`;
const getEmployeesURL = `${url}job_employers/`;
const companyLogosURL = `https://pinc-node-micro.herokuapp.com/image-search?q=`;
const getSingleCompanyURL = `${url}job_employers/`;
const moreCompaniesURL = `${url}job_employers?page[number]=`;
const myCompanyAccessURL = `${url}job_employers/mine`;
const companyAdminsURL = `${url}job_employers/`;
//const addRatingURL = '${url}job_employers/';


// ```Method: POST
// URL: {{base_url}}/job_employers/:companyId/create_admin```

// *Companies I’m admin of*
// ```Method: GET
// URL: {{base_url}}/job_employers/iam_admin```

export const ADD_COMPANY = 'ADD_COMPANY';
export const EDIT_COMPANY = 'EDIT_COMPANY';
export const GET_COMPANY_SIZES = 'GET_COMPANY_SIZES';
export const GET_COMPANY_JOBS = 'GET_COMPANY_JOBS';
export const GET_MORE_COMPANY_JOBS = 'GET_MORE_COMPANY_JOBS';
export const GET_COMPANIES = 'GET_COMPANIES';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_RATINGS = 'GET_RATINGS';
export const ADD_USER_RATING = 'ADD_USER_RATING';
export const GET_SINGLE_COMPANY = 'GET_SINGLE_COMPANY';
export const LOAD_MORE_COMPANIES = 'LOAD_MORE_COMPANIES';
export const GET_LOGOS = 'GET_LOGOS';
export const ADD_COMPANY_ADMIN = 'ADD_COMPANY_ADMIN';
export const GET_MY_COMPANIES = 'GET_MY_COMPANIES';
export const GET_COMPANY_ADMINS = 'GET_COMPANY_ADMINS';
export const ERROR = 'ERROR';

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

// Method: POST
// URL: {{base_url}}/job_employers
// Body:
// {
//     "company": {
//         "name": "Portland Engineering",
//         "user_company_size_id": 3,
//         "description": "A Medium sized company",
//         "industry_id": 1
//     }
// }
//CREATE (POST) NEW COMPANY
export const addCompany = (company, ID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: companyURL,
      headers: headers(),
      data:
        {
          "company": {
            "name": company.name,
            "user_company_size_id": company.size,
            "description": company.description,
            "headquarters": company.location,
            "industry_id": company.industry,
            "address": company.address,
            "phone_number": company.phone,
            "email": company.email,
            "zip": company.zip,
            "photo": company.logo
          }
        }
    })
    .then(response => {
       dispatch({
         type: ADD_COMPANY,
         newCompany: response.data.data
      });
       toast.success(`${response.data.data.attributes.name} successfully created!`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      history.push(`/company/${response.data.data.id}`);
      // PUSH to NEW COMPANY PAGE
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const editCompany = (newCompanyInfo, companyID) => {
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: companyURL + `/` + companyID,
      headers: headers(),
      data: { company : newCompanyInfo}
    })
    .then(response => {
      console.log(response);
      if(response.status === 200){
        dispatch({
            type: GET_SINGLE_COMPANY,
            company: response.data.data
        });
        //  dispatch({
        //    type: EDIT_COMPANY,
        //    editedCompany: response.data.data
        // });
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
export const getCompanySizes = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getCompanySizesURL,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_COMPANY_SIZES,
          companySizes: response.data.data
       });
    })
    .catch(err => {
      console.log(err);
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const getJobsByCompany = (companyID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getJobsByCompanyURL + companyID,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_COMPANY_JOBS,
          jobs: response.data.data
       });
    })
    .catch(err => {
      console.log(err);
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
// PAGINATION to GET more jobs by COMPANY and add them to job STATE
export const loadMoreJobsByCompany = (page, companyID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getMoreJobsByCompanyURL + page + `&page[size]=5&company_id=` + companyID,
      headers: headers()
      })
    .then(jobs => {
      dispatch({
        type: GET_MORE_COMPANY_JOBS,
        jobs: jobs.data.data,
        page: jobs.data.meta.total_pages
      });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const loadCompaniesForPeople = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getCompaniesURL,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_COMPANIES,
          companies: response.data.data
       });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const loadCompanies = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: searchCompaniesURL + query,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_COMPANIES,
          companies: response.data.data
       });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
// PAGINATION to GET more jobs and add them to job STATE
export const loadMoreCompanies = (page, query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: moreCompaniesURL + page + `&page[size]=20`,
      headers: headers()
      })
    .then(companies => {
      dispatch({
        type: LOAD_MORE_COMPANIES,
        companies: companies.data.data,
        page: companies.data.meta.total_pages
      });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const getSingleCompany = (companyID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getSingleCompanyURL + companyID,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_SINGLE_COMPANY,
          company: response.data.data
       });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const getEmployees = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getEmployeesURL + ID + `/employees`,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_EMPLOYEES,
          employees: response.data.data
       });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const getRatings = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getEmployeesURL + ID + `/reviews`,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_RATINGS,
          ratings: response.data.data
       });
       //console.log('ratings',response);
    })
    .catch(err => {
      toast.error(`Error getting ratings`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
//ADD (POST) NEW USER RATING
export const addUserRating = (rating, review, companyID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: getEmployeesURL + companyID + '/rate',
      headers: headers(),
      data: {
          "rating": {
            "rate": rating,
            "review": review
          }
        }
    })
    .then((response) => {
      if(response.status === 200) {
        dispatch({
          type: ADD_USER_RATING,
          rating: response.data.data
        });
      }
      toast.success(`Company successfully reviewed!`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Failed to add review'
      });
    });
  };
};
export const getCompanyLogos = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: companyLogosURL + query,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_LOGOS,
          logos: response.data.data
       });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const getMyCompanies = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: myCompanyAccessURL,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: GET_MY_COMPANIES,
        companies: response.data.data
      });
    })
    .catch(err => {
      toast.error(`Couldn't Retrieve Your Companies`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const getCompanyAdmins = (id) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: companyAdminsURL + id + `/view_admins`,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: GET_COMPANY_ADMINS,
        admins: response.data.data
      });
    })
    .catch(err => {
      toast.error(`Couldn't Retrieve Company Admins`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const addCompanyAdmin = (companyID, userID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: companyAdminsURL + parseInt(companyID) + `/create_admin`,
      headers: headers(),
      data:
        {
          "admin": {
            "user_id": userID
          }
        }
    })
    .then(response => {
      if(response.status === 201) {
        toast.success(`Admin Added`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          pauseOnHover: false,
        });
      }
      dispatch({
        type: ADD_COMPANY_ADMIN,
        admins: response.data.data
      });
    })
    .catch(err => {
      toast.error(`Couldn't Add Admin, Please Try Again`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};