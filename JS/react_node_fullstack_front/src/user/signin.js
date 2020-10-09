import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {signin, authenticate} from "../auth";

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: "",
			redirectToReferer: false,
			loading: false
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
		this.setState({loading: true});
		const {email, password} = this.state;
		const user = {email, password};

		signin(user)
		.then(data => {
			if(data.error) return this.setState({error: data.error, loading: false});
			else {
				authenticate(data, () => {
					this.setState({redirectToReferer: true});
				});
			};
		});
	};

	

	render() {
		const {email, password, error, redirectToReferer, loading} = this.state;

		if(redirectToReferer) {
			return <Redirect to="/" />
		};

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">SignIn</h2>
				<div className="alert alert-warning" style={{display: !error ? "none" : "block"}}>{error}</div>
				{loading ? <div className="jumbotron text-center">
					<h2>Loading</h2>
				</div> : null}
				<form onSubmit={this.clickSubmit}>
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

export default Signin;
