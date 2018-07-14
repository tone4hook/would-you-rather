import {
	RECEIVE_QUESTIONS,
	ANSWER_QUESTION,
	ADD_QUESTION
} from "../actions/actionTypes";

export default function questions(state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions
			};
		case ANSWER_QUESTION:
			console.log(state);
			return {
				...state,
				[action.id]: {
					...state[action.id],
					[action.answer]: {
						text: state[action.id][action.answer].text,
						votes: state[action.id][action.answer].votes.concat([
							action.authedUser
						])
					}
				}
			};
		case ADD_QUESTION:
			return {
				...state,
				[action.question.id]: action.question
			};
		default:
			return state;
	}
}
