import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setPreviousPath } from "../actions/previous";
import LeaderboardItem from "./LeaderboardItem";

class Leaderboard extends Component {
	// set previous path
	componentDidMount() {
		const { authedUser, prevPath, setPath } = this.props
		if (authedUser === null) {
			setPath(prevPath);
		}
	}
	render() {
		const { authedUser, sortedUsers } = this.props;
		if (authedUser === null) {
			return <Redirect to="/login" />;
		}

		return (
			<ul className="list-group mt-2">
				{sortedUsers.map(user => (
					<li className="list-group-item" key={user}>
						<LeaderboardItem user={user} />
					</li>
				))}
			</ul>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setPath: path => {
			dispatch(setPreviousPath(path));
		}
	}
}

function mapStateToProps({ authedUser, questions, users }, history) {
	if (authedUser === null) {
		return {
			prevPath: history.location.pathname,
			authedUser,
			questions,
			sortedUsers: []
		};
	}

	return {
		authedUser,
		questions,
		sortedUsers: Object.keys(users).sort((a, b) => {
			return (
				users[b].questions.length +
				Object.keys(users[b].answers).length -
				(users[a].questions.length + Object.keys(users[a].answers).length)
			);
		})
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
