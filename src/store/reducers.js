import { LOGGED_USER } from './actionType';

export function loggedUser(state = {}, action) {
	switch (action.type) {
		case LOGGED_USER:
			return action.user
		default:
			return state
	}
}
