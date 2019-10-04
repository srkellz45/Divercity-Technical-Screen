import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';

export const SEARCH_USERS = 'SEARCH_USERS';
export const SEARCH_JOBS = 'SEARCH_JOBS';
export const SEARCH_GROUPS = 'SEARCH_GROUPS';
export const GET_COMPANIES = 'GET_COMPANIES';
export const ERROR = 'ERROR';

const searchUserURL = `${url}users?search_query=`;
const searchCompaniesURL = `${url}job_employers?page[number]=0&page[size]=10&search_query=`;
const searchJobsURL = `${url}jobs?page[number]=0&page[size]=10&search_query=`;
const searchGroupsURL = `${url}group_of_interests?page[number]=0&page[size]=10&search_query=`;

const headers = () => ({
	'access-token': localStorage.getItem('access-token'),
	uid: localStorage.getItem('uid'),
	client: localStorage.getItem('client'),
	id: localStorage.getItem('id')
});

export const performSearch = (page, query) => dispatch => {
	Axios.get(searchUserURL + query, {
      headers: headers()
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
    .then(() => {
    	Axios.get(searchJobsURL + query, {
			headers: headers()
    	})
    })
    .then(jobs => dispatch({
		type: SEARCH_JOBS,
		jobs: jobs.data.data
	}))
    .then(() => {
    	Axios.get(searchCompaniesURL + query, {
        	headers: headers()
    	})
    })
    .then(response => {
		console.log(response.data);

        dispatch({
          type: GET_COMPANIES,
          companies: response.data.data
		});
    })
    .then(() => {
    	Axios.get(searchGroupsURL + query, {
        	headers: headers()
    	})
    })
    .then(response => dispatch({
		type: SEARCH_GROUPS,
		results: response.data.data
	}))
    .catch(err => {
		console.log(err);

		dispatch({
			type: ERROR,
			error: err
		});
    });
};