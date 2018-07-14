import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setPreviousPath } from "../actions/previous";
import Question from "./Question";
import { handleAnswerQuestion } from "../actions/shared";

class QuestionPage extends Component {
	state = {
		answerQuestion: "",
		toHome: false
	};
	// set previous path
	componentDidMount() {
		const { authedUser, prevPath, setPath } = this.props
		if (authedUser === null) {
			setPath(prevPath);
		}
	}
	// handle select input change event
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};
	// handle form submit and get selected input
	handleSubmit = e => {
		e.preventDefault();

		const { id, setAnswer } = this.props;
		const { answerQuestion } = this.state;
		// check input
		if (answerQuestion === "optionOne" || answerQuestion === "optionTwo") {
			setAnswer(id, answerQuestion);
			this.setState({
				answerQuestion: "",
				toHome: true
			});
		} else {
			alert("Please choose an option");
		}
	};
	// conditional render handler
	handleIsAnswered = (bool, question) => {
		if (!bool) {
			return (
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label className="mr-sm-2" htmlFor="answerQuestion">
							Answer:
						</label>
						<select
							className="custom-select mr-sm-2"
							id="answerQuestion"
							onChange={this.handleChange}
						>
							<option value="none">Choose...</option>
							<option value="optionOne">{question.optionOne.text}</option>
							<option value="optionTwo">{question.optionTwo.text}</option>
						</select>
					</div>
					<button type="submit" className="btn btn-primary btn-block">
						Submit
					</button>
				</form>
			);
		}

		return (
			<div className="bg-light">
				<h4 className="text-center">You answered this question.</h4>
				<div className="d-flex justify-content-around align-items-center flex-wrap">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">{question.optionOne.text}</h5>
							<p className="card-text">
								Votes: {question.optionOne.votes.length}
							</p>
							<p className="card-text">
								{this.getVotePercentage(question.optionOne, question.optionTwo)}
							</p>
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">{question.optionTwo.text}</h5>
							<p className="card-text">
								Votes: {question.optionTwo.votes.length}
							</p>
							<p className="card-text">
								{this.getVotePercentage(question.optionTwo, question.optionOne)}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	getVotePercentage = (option, otherOption) => {
		const sum = option.votes.length + otherOption.votes.length;
		const percentage = Math.round(
			( option.votes.length / sum ) * 100
		);
		return percentage + "%";
	};

	render() {
		const {
			authedUser,
			users,
			id,
			questions
		} = this.props;

		if (authedUser === null) {
			return <Redirect to="/login" />;
		}

		const { toHome } = this.state;
		let isAnswered = false;
		let avatarUrl = '';
		let avatarStyle = {};

		if (Object.keys(questions).length !== 0
			&& questions.constructor === Object) {
			avatarUrl = users[questions[id].author].avatarURL
				? users[questions[id].author].avatarURL : null;
			isAnswered = users[authedUser].answers[id] ? true : false;
			avatarStyle = avatarUrl
				? { backgroundImage: `url(${avatarUrl})` }
				: {};
		}
		// if question answered return home
		if (toHome === true) {
			return <Redirect to="/" />;
		}

		return (
			<Fragment>
				<div className="d-flex justify-content-center my-2">
					<h2 className="text-secondary">Would You Rather...?</h2>
				</div>
				<Question id={id} isAnswered={isAnswered} />
				<div className="d-flex justify-content-center my-2">
					<p className="lead">Question posted by:</p>
				</div>
				<div className="d-flex justify-content-center my-2">
					<div
						className={avatarUrl ? "avatar" : "defaultAvatar"}
						style={avatarStyle}
					/>
					<div className="align-self-center ml-1">
						{users[questions[id].author].name}
					</div>
				</div>
				<div className="d-flex justify-content-center">
					{this.handleIsAnswered(isAnswered, questions[id])}
				</div>
			</Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setPath: path => {
			dispatch(setPreviousPath(path));
		},
		setAnswer: (id, answerQuestion) => {
			dispatch(handleAnswerQuestion(id, answerQuestion));
		}
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props.match.params;
	return {
		authedUser,
		questions,
		users,
		id,
		prevPath: props.location.pathname
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
