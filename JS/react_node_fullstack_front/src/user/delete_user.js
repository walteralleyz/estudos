import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {isAuthenticated, signout} from "../auth";
import {remove} from "./api_user";

class DeleteUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};
	};

	deleteAccount = () => {
		const token = isAuthenticated().message;
		const user_id = this.props.userId;
		remove(user_id, token)
		.then(data => {
			if(data.error) console.log(data.error);
			signout(() => console.log("User is deleted!"));
			this.setState({redirect: true});
		})
	};

	deleteConfirmed = () => {
		let answer = window.confirm("Are you sure?");
		if(answer) this.deleteAccount();
		return false;
	};

	render() {
		if(this.state.redirect) return <Redirect to="/" />;
		return (
			<input type="button" value="Delete profile" onClick={this.deleteConfirmed} className="btn btn-raised btn-danger" />
		);
	};
};

export default DeleteUser;
