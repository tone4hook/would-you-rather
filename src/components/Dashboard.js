import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ButtonGroup from "./ButtonGroup";
import Question from "./Question";

class Dashboard extends Component {
	// get the user questions lists elements
	state = {
		userLists: document.getElementsByClassName("user-list-container")
	};

	render() {
		const { userLists } = this.state;
		const { authedUser, answeredIds, unansweredIds } = this.props;
		// if not logged in go to login
		if (authedUser === null) {
			return <Redirect to="/login" />;
		}

		return (
			<Fragment>
				<ButtonGroup userLists={userLists} />
				<div className="my-2 py-1">
					<h5 className="text-secondary text-center">Would you rather...?</h5>
				</div>
				<div className="user-list-container">
					<ul className="list-group mt-2">
						{unansweredIds.map(id => (
							<li className="list-group-item" key={id}>
								<Question id={id} isAnswered={false} />
							</li>
						))}
					</ul>
				</div>
				<div className="user-list-container d-none">
					<ul className="list-group mt-2">
						{answeredIds.map(id => (
							<li className="list-group-item" key={id}>
								<Question id={id} isAnswered={true} />
							</li>
						))}
					</ul>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps({ authedUser, questions, users }) {
	if (authedUser === null) {
		return {
			authedUser,
			name: "",
			answeredIds: [],
			unansweredIds: []
		};
	}

	const answered = users[authedUser].answers;

	return {
		authedUser,
		answeredIds: Object.keys(answered)
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
		unansweredIds: Object.keys(questions)
			.filter(question => !answered[question])
			.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
	};
}

export default connect(mapStateToProps)(Dashboard);
