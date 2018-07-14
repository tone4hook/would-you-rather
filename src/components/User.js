import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class User extends Component {
	// handle logout button click
	// by setting authedUser to null
	handleLogout = (e) => {
		e.preventDefault();
		const { setUser } = this.props;
		setUser(null);
	}
	// condistional render handler
	UserInfo = () => {
		const { authedUser, name, avatarUrl } = this.props;

		const avatarStyle = avatarUrl
			? { backgroundImage: `url(${avatarUrl})` }
			: {};

		if (authedUser === null) {
			return null;
		}

		return (
			<div className="container">
				<div className="d-flex justify-content-end my-2">
					<div
						className={avatarUrl ? "avatar" : "defaultAvatar"}
						style={avatarStyle}
					/>
					<div className="align-self-center ml-1">{name}</div>
				</div>
				<div className="d-flex justify-content-end my-2">
					<button className="btn btn-dark" onClick={this.handleLogout}>Logout</button>
				</div>
			</div>
		);
	};

	render() {
		return this.UserInfo();
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setUser: id => {
			dispatch(setAuthedUser(id));
		}
	}
}

function mapStateToProps({ authedUser, users }) {
	if (authedUser === null) {
		return {
			authedUser,
			name: "",
			avatarUrl: ""
		};
	}

	const name = users[authedUser].name;
	const avatarUrl = users[authedUser].avatarURL
		? users[authedUser].avatarURL
		: null;

	return {
		name,
		avatarUrl
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
