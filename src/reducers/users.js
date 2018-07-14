import {
	RECEIVE_USERS,
	UPDATE_USER_ANSWER,
	UPDATE_USER_QUESTIONS
} from "../actions/actionTypes";

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users
			};

		case UPDATE_USER_ANSWER:
			return {
				...state,
				[action.authedUser]: {
					...state[action.authedUser],
					answers: {
						...state[action.authedUser].answers,
						[action.id]: action.answer
					}
				}
			};

		case UPDATE_USER_QUESTIONS:
			return {
				...state,
				[action.authedUser]: {
					...state[action.authedUser],
					questions: state[action.authedUser].questions.concat([action.id])
				}
			};

		default:
			return state;
	}
}
