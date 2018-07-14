import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import Error404 from "./components/Error404";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import LoginForm from "./components/LoginForm";
import AddQuestionForm from "./components/AddQuestionForm";
import QuestionPage from "./components/QuestionPage";
import User from "./components/User";
import "./css/bootstrap.min.css";
import "./css/style.css";

class App extends Component {
	// get the initial data
	componentDidMount() {
		const { getInitialData } = this.props;
		getInitialData();
	}

	render() {
		const { authedUser, loading } = this.props;
		// if loading do not render main components
		return (
			<BrowserRouter>
				<Fragment>
					<LoadingBar />
					{loading === true ? null : (
						<Fragment>
							<Navbar authedUser={authedUser} />
							<User />
							<Switch>
								<Route
									exact
									path="/"
									render={() => (
										<div className="container">
											<Dashboard />
										</div>
									)}
								/>
								<Route
									exact
									path="/leaderboard"
									render={({ history }) => (
										<div className="container">
											<Leaderboard {...history} />
										</div>
									)}
								/>
								<Route
									exact
									path="/add"
									render={({ history }) => (
										<div className="container">
											<AddQuestionForm {...history} />
										</div>
									)}
								/>
								<Route
									exact
									path="/questions/:id"
									render={props => (
										<div className="container">
											<QuestionPage {...props} />
										</div>
									)}
								/>
								<Route
									exact
									path="/login"
									render={({ history }) => (
										<div className="container">
											<LoginForm {...history} />
										</div>
									)}
								/>
								<Route path="/404" component={Error404} />
								<Redirect from="*" to="/404" />
							</Switch>
						</Fragment>
					)}
				</Fragment>
			</BrowserRouter>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getInitialData: () => {
			dispatch(handleInitialData());
		}
	}
}

function mapStateToProps({ authedUser, users }) {
	return {
		authedUser,
		loading: users === null
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
