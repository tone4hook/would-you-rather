import React from "react";
import { connect } from "react-redux";

const LeaderboardItem = ({ name, totalQuestions, totalAnswered, avatarUrl }) => {

	const avatarStyle = avatarUrl
		? { backgroundImage: `url(${avatarUrl})` }
		: {};

	return (
		<div className="d-flex align-items-start flex-column">
			<div className="d-flex align-items-center">
				<div
					className={avatarUrl ? "avatar" : "defaultAvatar"}
					style={avatarStyle}
				/>
				<h4>{name}</h4>
			</div>
			<p>Questions asked: {totalQuestions}</p>
			<p>Questions answered: {totalAnswered}</p>
		</div>
	);
}

function mapStateToProps({ users }, { user }) {
	const avatarUrl = users[user].avatarURL ? users[user].avatarURL : null;
	const name = users[user].name;
	const totalQuestions = users[user].questions.length;
	const totalAnswered = Object.keys(users[user].answers).length;

	return {
		name,
		totalQuestions,
		totalAnswered,
		avatarUrl
	};
}

export default connect(mapStateToProps)(LeaderboardItem);
