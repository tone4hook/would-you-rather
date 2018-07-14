
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class LoginForm extends Component {
	// local state with user and toHome boolean
	state = {
		userName: this.props.authedUser,
		toHome: false
	};
	// handle login form submit
	handleSubmit = e => {
		e.preventDefault();
		const { userName } = this.state;
		const { setUser } = this.props;
		// check slected input text before dispatch
		if (userName !== "none" && userName !== undefined && userName !== null) {
			setUser(userName);
			this.setState({
				toHome: true
			});
		} else {
			alert("Please choose a username.");
		}
	};
	// handle select input on change event
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	render() {
		const { previousPath, users } = this.props;
		const { toHome } = this.state;
		const toPath = previousPath === null ? "/" : previousPath;
		// redirect to previous path(if there is one)
		if (toHome === true) {
			return <Redirect to={toPath} />;
		}

		return (
			<div className="d-flex justify-content-center mt-5 p-2 p-md-5 border border-dark">
				<form onSubmit={this.handleSubmit}>
					<h4 className="text-center">Would you rather...?</h4>
					<p className="lead text-center">Please pick a username and login.</p>
					<div className="form-group">
						<label className="mr-sm-2" htmlFor="userName">
							Username:
						</label>
						<select
							className="custom-select mr-sm-2"
							id="userName"
							onChange={this.handleChange}
						>
							<option value="none">Choose...</option>
							{users.map(user => (
								<option key={user} value={user}>
									{user}
								</option>
							))}
						</select>
					</div>
					<button type="submit" className="btn btn-primary btn-block">
						Login
					</button>
				</form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setUser: (userName) => {
			dispatch(setAuthedUser(userName));
		}
	}
}

function mapStateToProps({ previousPath, users }, history) {

	return {
		previousPath,
		users: Object.keys(users)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
