import React, {Component} from "react";
import {Link} from "react-router-dom";
import {signup} from "../auth";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			error: "",
			valid: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.clickSubmit = this.clickSubmit.bind(this);
	};

	handleChange = name => event => {
		this.setState({"error": "", "valid": false});
		this.setState({[name]: event.target.value});
	};

	clickSubmit = event => {
		event.preventDefault();
		const {name, email, password} = this.state;
		const user = {name, email, password};

		signup(user)
		.then(data => {
			if(data.error) this.setState({error: data.error});
			else this.setState({
				name: "",
				email: "",
				password: "",
				error: "",
				valid: true
			});
		});
	};

	render() {
		const {name, email, password, error, valid} = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Signup</h2>
				<div className="alert alert-warning" style={{display: !error ? "none" : "block"}}>{error}</div>
				<div className="alert alert-info" style={{display: !valid ? "none" : "block"}}>New Account is successfully created. Please <Link to="/signin">Sign In!</Link></div>
				<form onSubmit={this.clickSubmit}>
					<div className="form-group">
						<label className="text-muted">Name</label>
						<input 
						onChange={this.handleChange("name")} 
						type="text" 
						className="form-control" 
						value={name}
						autoComplete="username"
						/>
					</div>
					<div className="form-group">
						<label className="text-muted">Email</label>
						<input 
						onChange={this.handleChange("email")} 
						type="email" 
						className="form-control" 
						value={email}
						autoComplete="email"
						/>
					</div>
					<div className="form-group">
						<label className="text-muted">Password</label>
						<input 
						onChange={this.handleChange("password")} 
						type="password" 
						className="form-control" 
						value={password}
						autoComplete="current-password"
						/>
					</div>
					<button className="btn btn-raised btn-primary">Submit</button>
				</form>
			</div>
		);
	};
	
};

export default Signup;
