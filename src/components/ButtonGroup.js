import React, { Component } from "react";

class ButtonGroup extends Component {
	// get the answered and unanswered button elements
	state = {
		buttons: document.getElementsByClassName("question-btn")
	};
	// handle toggle button clicks
	// toggle active and display css classes
	handleButtonClick = e => {
		e.preventDefault();

		const { buttons } = this.state;

		const { userLists } = this.props;

		this.toggleClass(buttons, "active");

		this.toggleClass(userLists, "d-none");
	};
	// utility for toggling css classes
	toggleClass = (elements, cssClass) => {
		for (let el of elements) {
			el.classList.toggle(cssClass);
		}
	};

	render() {
		return (
			<div className="d-flex justify-content-center">
				<div className="btn-group" role="group" aria-label="Question Buttons">
					<button
						type="button"
						className="btn btn-outline-dark question-btn active"
						onClick={e => this.handleButtonClick(e)}
					>
						Unanswered
					</button>
					<button
						type="button"
						className="btn btn-outline-dark question-btn"
						onClick={e => this.handleButtonClick(e)}
					>
						Answered
					</button>
				</div>
			</div>
		);
	}
}

export default ButtonGroup;
