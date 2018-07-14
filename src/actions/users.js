import {
	RECEIVE_USERS,
	UPDATE_USER_ANSWER,
	UPDATE_USER_QUESTIONS
} from './actionTypes';

export function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users
	};
}

export function updateUserAnswers(authedUser, id, answer) {
	return {
		type: UPDATE_USER_ANSWER,
		authedUser,
		id,
		answer
	};
}

export function updateUserQuestions(authedUser, id) {
	return {
		type: UPDATE_USER_QUESTIONS,
		authedUser,
		id
	};
}
