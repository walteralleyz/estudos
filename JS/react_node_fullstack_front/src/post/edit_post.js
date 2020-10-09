import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {singlePost, update} from "./api_post";
import {isAuthenticated} from "../auth";
import DefaultImage from "../images/default.jpg";

class EditPost extends Component {
	constructor() {
		super();
		this.state = {
			id: "",
			title: "",
			body: "",
			photo: "",
			fileSize: "",
			redirectToPost: false
		};
		this.postData = new FormData();
	};

	init = postId => {
		singlePost(postId)
		.then(data => {
			if(data.error) return this.setState({redirectToPost: true});
			this.setState({
				id: data._id, 
				title: data.title, 
				body: data.body,
				error: "",
				loading: false	
			});
		});
	};

	handleChange = name => ev => {
		this.setState({error: ""});
		const value =  name === "photo" ? ev.target.files[0] : ev.target.value;
		const fileSize = name === "photo" ? ev.target.files[0].size : 0;

		this.postData.set(name, value);
		this.setState({[name]: value, fileSize});
	};

	isValid = () => {
		const {title, body, fileSize} = this.state;

		if(fileSize > 10000) return this.setState({error: "File should be less than 100kb.", loading: false});
		if(title.length === 0 || body.length === 0) return this.setState({error: "All fields are required!", loading: false});
		return true;
	};

	clickSubmit = event => {
		event.preventDefault();
		const post_id = this.state.id;
		const token = isAuthenticated().message;
		this.setState({loading: true});	

		if(this.isValid()) {
			update(post_id, token, this.postData)
			.then(data => {
				if(data.error) return this.setState({error: data.error});
				this.setState({ 
					redirectToProfile: true,
					loading: false,
					title: "",
					body: ""
				});
			});
		};
	};

	editForm = (...args) => {
		const [
			title, 
			body
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
			<label className="text-muted">Title</label>
			<input 
			onChange={this.handleChange("title")} 
			type="text" 
			className="form-control"
			value={title || ""}
			autoComplete="email"
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
		<button className="btn btn-raised btn-primary">Update</button>
		</>)
	};

	componentDidMount() {
		const post_id = this.props.match.params.postId;
		this.init(post_id);
	};

	render() {
		const {id,
		title, 
		body, 
		redirectToPost, 
		loading,
		error} = this.state;

		if(redirectToPost) return <Redirect to={`/user/${isAuthenticated().user._id}`} />

		return (
			<div className="container">
			<form onSubmit={this.clickSubmit}>
				<div 
					className="alert alert-warning" 
					style={{display: !error ? "none" : "block"}}>
					{error}
				</div>

				{loading ? (
					<div className="jumbotron text-center">
						<h2>Loading...</h2>
					</div>
				) : (
					""
				)}

				<h2 className="mt-5 mb-5">{title}</h2>
				<img 
				style={{height: "200px", width: "auto", borderRadius: "100%"}}
				className="img-thumbnail"
				src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`} 
				onError={i => i.target.src = `${DefaultImage}`}
				alt={title} 
				/>
				{this.editForm(title, body)}
			</form>
			</div>
		);
	};
};

export default EditPost;
