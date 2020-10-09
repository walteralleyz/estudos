import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {read, update, updateUser} from "./api_user";
import DefaultImage from "../images/avatar_profile.jpg";

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			name: "",
			password: "",
			email: "",
			error: "",
			fileSize: "",
			about: "",
			redirectToProfile: false,
			loading: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.clickSubmit = this.clickSubmit.bind(this);
		this.userData = new FormData();
	};

	init = userId => {
		const token = isAuthenticated().message;
		read(userId, token)
		.then(data => {
			if(data.error) return this.setState({redirectToProfile: true});
			this.setState({
				id: data.user._id, 
				name: data.user.name, 
				email: data.user.email,
				about: data.user.about,
				error: ""		
			});
		});
	};

	componentDidMount() {
		const user_id = this.props.match.params.userId;
		this.init(user_id);
	};

	isValid = () => {
		const {name, email, password, fileSize} = this.state;
		// eslint-disable-next-line
		const regex_email = /^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if(fileSize > 10000) return this.setState({error: "File should be less than 100kb.", loading: false});
		if(name.length === 0) return this.setState({error: "Name is required!", loading: false});
		if(!regex_email.test(email)) return this.setState({error: "A valid Email is required!", loading: false});
		if(password.length >= 1 && password.length <= 5) return this.setState({error: "Password must be at least 6 characters long.", loading: false});
		return true;
	};

	handleChange = name => ev => {
		this.setState({error: ""});
		const value =  name === "photo" ? ev.target.files[0] : ev.target.value;
		const fileSize = name === "photo" ? ev.target.files[0].size : 0;

		this.userData.set(name, value);
		this.setState({[name]: value, fileSize});
	};

	clickSubmit = event => {
		event.preventDefault();
		const user_id = this.props.match.params.userId;
		const token = isAuthenticated().message;
		this.setState({loading: true});	

		if(this.isValid()) {
			update(user_id, token, this.userData)
			.then(data => {
				if(data.error) return this.setState({error: data.error});
				return updateUser(data, () => {
					this.setState({ redirectToProfile: true });
				});
			});
		};
	};

	editForm = (...args) => {
		const [
			name, 
			email, 
			password,
			about
		] = [...args];

		return (
		<>
		<div className="form-group">
			<label className="text-muted">Profile Photo</label>
			<input 
			onChange={this.handleChange("photo")} 
			type="file" 
			className="form-control"
			accept="image/*" 
			/>
		</div>				

		<div className="form-group">
			<label className="text-muted">Name</label>
			<input 
			onChange={this.handleChange("name")} 
			type="text" 
			className="form-control" 
			value={name || ""}
			autoComplete="username"
			/>
		</div>

		<div className="form-group">
			<label className="text-muted">Email</label>
			<input 
			onChange={this.handleChange("email")} 
			type="email" 
			className="form-control"
			value={email || ""}
			autoComplete="email"
			/>
		</div>

		<div className="form-group">
			<label className="text-muted">About</label>
			<textarea 
			onChange={this.handleChange("about")} 
			type="text" 
			className="form-control" 
			value={about || ""}
			/>
		</div>

		<div className="form-group">
			<label className="text-muted">Password</label>
			<input 
			onChange={this.handleChange("password")} 
			type="password" 
			className="form-control"
			value={password || ""}
			autoComplete="current-password"
			/>
		</div>
		<button className="btn btn-raised btn-primary">Update</button>
		</>)
	};

	render() {
		const {
			name, 
			email, 
			password, 
			redirectToProfile, 
			error,
			about,
			loading
		} = this.state;

		const id = this.props.match.params.userId;
		const photo = `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`;

		if(redirectToProfile) return <Redirect to={`/user/${id}`} />;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Edit Profile</h2>
				<form onSubmit={this.clickSubmit}>
					<div className="alert alert-warning" style={{display: !error ? "none" : "block"}}>{error}</div>

				{loading ? (
					<div className="jumbotron text-center">
						<h2>Loading...</h2>
					</div>
				) : (
					""
				)}
					<img 
					style={{height: "200px", width: "auto", borderRadius: "100%"}}
					className="img-thumbnail"
					src={photo} 
					onError={i => i.target.src = `${DefaultImage}`}
					alt={name} 
					/>
					{this.editForm(name, email, password, about)}

				</form>
			</div>
		);
	};
};

export default EditProfile;
