import { SET_PREVIOUS_PATH } from "../actions/actionTypes";

export default function previousPath(state = null, action) {
	switch (action.type) {
		case SET_PREVIOUS_PATH:
			return action.path;
		default:
			return state;
	}
}
