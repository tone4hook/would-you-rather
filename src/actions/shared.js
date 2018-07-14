import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import {
	receiveUsers,
	updateUserAnswers,
	updateUserQuestions
} from "../actions/users";
import {
	receiveQuestions,
	addQuestion,
	answerQuestion
} from "../actions/questions";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
	return dispatch => {
		dispatch(showLoading());
		return getInitialData().then(({ users, questions }) => {
			dispatch(receiveUsers(users));
			dispatch(receiveQuestions(questions));
			dispatch(hideLoading());
		});
	};
}

export function handleAddQuestion(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestion({
			optionOneText,
			optionTwoText,
			author: authedUser
		})
			.then(question => {
				dispatch(addQuestion(question));

				dispatch(updateUserQuestions(authedUser, question.id));
			})
			.catch(e => {
				console.warn("Error in handleAddQuestion: ", e);

				alert("The was an error adding the question. Try again.");
			})
			.then(() => dispatch(hideLoading()));
	};
}

export function handleAnswerQuestion(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		dispatch(answerQuestion({ authedUser, qid, answer }));

		dispatch(updateUserAnswers(authedUser, qid, answer));

		return saveQuestionAnswer({ authedUser, qid, answer })
			.catch(e => {
				console.warn("Error in handlesaveQuestionAnswer: ", e);

				dispatch(answerQuestion({ authedUser, qid, answer }));

				dispatch(updateUserAnswers(authedUser, qid, answer));

				alert("The was an error answering the question. Try again.");
			})
			.then(() => dispatch(hideLoading()));
	};
}
