import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
	render() {

		return (
			<ul className="nav justify-content-center bg-light">
				<li className="nav-item">
					<NavLink exact className="nav-link" activeClassName="active" to="/">
						Dashboard
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						className="nav-link"
						activeClassName="active"
						to="/leaderboard"
					>
						Leaderboard
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" activeClassName="active" to="/add">
						Add
						<span className="d-none d-md-inline">&nbsp;Question</span>
					</NavLink>
				</li>
			</ul>
		);
	}
}

export default Navbar;
