import {REMOVE_RECOMMENDED_USER} from '../actions/recommendedUsers.actions';

const initialState = localStorage.deselectedRecommendedUsersList ? JSON.parse(localStorage.getItem("deselectedRecommendedUsersList")) : [];

function deselectedRecommendedUsersList(state = initialState, action) {
	switch(action.type) {
		case REMOVE_RECOMMENDED_USER:
			localStorage.setItem("deselectedRecommendedUsersList", JSON.stringify([...state, action.id]));

			return [
				...state,
				action.id
			];
		default:
			return state;
	}
}

export default deselectedRecommendedUsersList;