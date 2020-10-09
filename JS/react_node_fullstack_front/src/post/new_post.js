import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {create} from "./api_post";

class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			body: "",
			photo: "",
			error: "",
			fileSize: "",
			user: {},
			loading: false,
			redirectToProfile: false
		};
	};

	componentDidMount() {
		this.post_data = new FormData();
		this.setState({user: isAuthenticated().user});
	};

	isValid = () => {
		const {title, body, fileSize} = this.state;

		if(fileSize > 10000) return this.setState({error: "File should be less than 100kb.", loading: false});

		if(title.length === 0 || body.length === 0) return this.setState({error: "All fields are required!", loading: false});
		return true;
	};

	handleChange = name => ev => {
		this.setState({error: ""});
		const value =  name === "photo" ? ev.target.files[0] : ev.target.value;
		const fileSize = name === "photo" ? ev.target.files[0].size : 0;

		this.post_data.set(name, value);
		this.setState({[name]: value, fileSize});
	};

	clickSubmit = event => {
		event.preventDefault();
		const user_id = isAuthenticated().user._id;
		const token = isAuthenticated().message;
		this.setState({loading: true});

		if(this.isValid()) {
			create(user_id, token, this.post_data)
			.then(data => {
				if(data.error) return this.setState({error: data.error});
				this.setState({
					loading: false,
					redirectToProfile: true,
					body: "",
					title: "",
					photo: ""
				});
			});
		};
	};

	newPostForm = (...args) => {
		const [
			title,
			body
		] = [...args];

		return (
		<>
		<div className="form-group">
			<label className="text-muted">Post Photo</label>
			<input 
			onChange={this.handleChange("photo")} 
			type="file" 
			className="form-control"
			accept="image/*" 
			/>
		</div>				

		<div className="form-group">
			<label className="text-muted">Title</label>
			<input 
			onChange={this.handleChange("title")} 
			type="text" 
			className="form-control" 
			value={title || ""}
			autoComplete="username"
			/>
		</div>

		<div className="form-group">
			<label className="text-muted">Body</label>
			<textarea 
			onChange={this.handleChange("body")} 
			type="text" 
			className="form-control" 
			value={body || ""}
			/>
		</div>

		<button className="btn btn-raised btn-primary">Create Post</button>
		</>)
	};

	render() {
		const {
			title,
			body,
			user,
			loading,
			error,
			redirectToProfile
		} = this.state;

		if(redirectToProfile) return <Redirect to={`/user/${user._id}`} />;

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Create a new Post</h2>
				<form onSubmit={this.clickSubmit}>
					<div className="alert alert-warning" style={{display: !error ? "none" : "block"}}>{error}</div>

				{loading ? (
					<div className="jumbotron text-center">
						<h2>Loading...</h2>
					</div>
				) : (
					""
				)}
					{this.newPostForm(title, body)}

				</form>
			</div>
		);
	};
};

export default NewPost;
