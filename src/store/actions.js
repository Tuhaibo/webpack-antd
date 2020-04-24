// actions.js
import { LOGGED_USER } from './actionType';
export const loggedUserAction = (user) => (dispatch) => {
	setTimeout(() => {
		dispatch({ type: LOGGED_USER, user })
	}, 2000)

}