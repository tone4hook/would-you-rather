import React, { Component } from "react";
import { connect } from "react-redux";
import { setPreviousPath } from "../actions/previous";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/shared";

class AddQuestionForm extends Component {
	// local state for textarea input
	// and toHome boolean
	state = {
		optionOne: "",
		optionTwo: "",
		toHome: false
	};
	// set previous path
	componentDidMount() {
		const { authedUser, prevPath, setPath } = this.props
		if (authedUser === null) {
			setPath(prevPath);
		}
	}
	// handle changes to textarea
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};
	// on submit handler
	handleSubmit = e => {
		e.preventDefault();

		const { optionOne, optionTwo } = this.state;
		const { id, addQuestion } = this.props;
		// alert if textarea(s) contains no content
		if (optionOne === "" || optionTwo === "") {
			alert("One or both options are empty. Please fill out both options.");
		} else {
			// add the question and update state with dispatch
			addQuestion(optionOne, optionTwo);
			this.setState({
				optionOne: "",
				optionTwo: "",
				toHome: id ? false : true
			});
		}
	};

	render() {
		const { optionOne, optionTwo, toHome } = this.state;
		const { authedUser } = this.props;

		if (authedUser === null) {
			return <Redirect to="/login" />;
		}
		// if added go to dashboard
		if (toHome === true) {
			return <Redirect to="/" />;
		}

		return (
			<div className="d-flex justify-content-center">
				<form className="p-2 bg-light" onSubmit={this.handleSubmit}>
					<p className="lead text-center">Would You Rather...?</p>
					<div className="form-group">
						<label htmlFor="optionOne">Option 1:</label>
						<textarea
							className="form-control"
							id="optionOne"
							rows="3"
							onChange={this.handleChange}
							value={optionOne}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="optionTwo">Option 2:</label>
						<textarea
							className="form-control"
							id="optionTwo"
							rows="3"
							onChange={this.handleChange}
							value={optionTwo}
						/>
					</div>
					<button type="submit" className="btn btn-primary btn-block">
						Add Question
					</button>
				</form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setPath: path => {dispatch(setPreviousPath(path))},
		addQuestion: (one, two) => {
			dispatch(handleAddQuestion(one, two));
		}
	};
}

function mapStateToProps({ authedUser }, history) {
	return {
		prevPath: history.location.pathname,
		authedUser
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionForm);
