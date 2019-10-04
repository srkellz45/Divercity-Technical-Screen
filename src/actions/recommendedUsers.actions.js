import Axios from 'axios';
import { url } from '../lib/url';
import {GET_RECOMMENDED_USERS, ERROR} from './user.actions';

export const REMOVE_RECOMMENDED_USER = 'REMOVE_RECOMMENDED_USER';

const getRecommendedUsersURL = `${url}recommenders/users?page[number]=0&page[size]=4`;
const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

export var removeRecommendedUser = id => (dispatch, getState) => {
	// List of existing users, excluding the one selected that we want removed
	var modifiedRecommendedUsers = getState().recommendedUsersList.filter(user => user.id !== id);

	dispatch({
		type: REMOVE_RECOMMENDED_USER,
		id
	});

	Axios({
		method: 'get',
		url: getRecommendedUsersURL,
		headers: headers()
	})
	.then(res => {
		// Get first user who's ID is not in the nonSelectedRecommendedUserIDs array
		var newRecommendedUser = res.data.data.filter(user => user.id !== id);

		dispatch({
			type: GET_RECOMMENDED_USERS,
			recUsers: modifiedRecommendedUsers.concat(newRecommendedUser)
		});
	})
	.catch(err => {
		console.error("Error: ", err);

		dispatch({
			type: ERROR,
			error: err
		});
	});
}