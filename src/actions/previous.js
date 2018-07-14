import { SET_PREVIOUS_PATH } from './actionTypes';

export function setPreviousPath(path) {
	return {
		type: SET_PREVIOUS_PATH,
		path
	};
}
