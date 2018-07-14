import { combineReducers } from "redux";
import previousPath from "./previous";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
	previousPath,
	authedUser,
	users,
	questions,
	loadingBar: loadingBarReducer
});
