import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
	render() {
		const { questions, users, id, isAnswered } = this.props;

		if (!questions[id]) {
			return <p>This question does not exist.</p>;
		}

		const { author, timestamp, optionOne, optionTwo } = questions[id];

		const d = new Date(timestamp).toDateString();

		return (
			<Link to={`/questions/${id}`} className="question">
				<div className="d-flex justify-content-start justify-content-md-around flex-wrap">
					<h3 className="text-dark mt-md-4 mb-4">
						{optionOne.text}
						<span className="badge badge-primary badge-pill ml-1">
							{isAnswered ? optionOne.votes.length : ""}
						</span>
					</h3>
					<h3 className="text-dark mt-md-4">
						{optionTwo.text}
						<span className="badge badge-primary badge-pill ml-1">
							{isAnswered ? optionTwo.votes.length : ""}
						</span>
					</h3>
				</div>
				<hr />
				<div className="d-flex justify-content-start justify-content-md-end">
					<p className="text-muted">
						post by {users[author].name} on {d}
					</p>
				</div>
			</Link>
		);
	}
}

function mapStateToProps({ authedUser, questions, users }, { id, isAnswered }) {
	return {
		authedUser,
		questions,
		users,
		id,
		isAnswered
	};
}
export default withRouter(connect(mapStateToProps)(Question));
