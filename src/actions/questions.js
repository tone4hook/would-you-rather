import {
	ADD_QUESTION,
	RECEIVE_QUESTIONS,
	ANSWER_QUESTION
} from './actionTypes';

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question
	};
}

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	};
}

export function answerQuestion({ authedUser, qid, answer }) {
	return {
		type: ANSWER_QUESTION,
		id: qid,
		authedUser,
		answer
	};
}
