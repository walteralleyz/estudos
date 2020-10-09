import React, {Component} from "react";
import {
	comment,
	uncomment
} from "./api_post";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import DefaultProfile from "../images/avatar_profile.jpg";

class Comment extends Component {
	state = {
		text: "",
		error: ""
	};

	handleChange = event => {
		this.setState({text: event.target.value, error: ""});
	};

	isValid = () => {
		const {text} = this.state;
		if(!text.length > 0 || text.length > 150) {
			this.setState({
				error: "Comment should be between 0 and 150 characters"
			});
			return false;
		};
		return true;
	};

	deleteComment = comment => {
		let answer = window.confirm("Do you want to delete this post?");
		if(answer) {
			const user_id = isAuthenticated().user._id;
			const token = isAuthenticated().message;
			const post_id = this.props.postId;

			uncomment(user_id, token, post_id, comment)
			.then(data => {
				if(data.error) console.log(data.error);
				this.props.updateComments(data.comments);
			})
		};
		return false;
	};

	addComment = e => {
		e.preventDefault();
		
		if(this.isValid()) {
			const user_id = isAuthenticated().user._id;
			const token = isAuthenticated().message;
			const post_id = this.props.postId;

			comment(user_id, token, post_id, {text: this.state.text})
			.then(data => {
				if(data.error) console.log(data.error);
				this.setState({text: ""});
				this.props.updateComments(data.comments);
			})
		};
	};

	render() {
		const {comments} = this.props;
		const {error} = this.state;

		return (
			<div>
				<h2 
				className="mt-5 mb-5">
					Leave a comment
				</h2>
				<form
				onSubmit={this.addComment}>
					<div 
						className="alert alert-warning" 
						style={{display: !error ? "none" : "block"}}>
						{error}
					</div>
					<div 
					className="form-group">
						<input 
						type="text" 
						className="form-control"
						onChange={this.handleChange} 
						value={this.state.text}
						placeholder="Leave a comment"
						/>
						<button
						type="submit"
						className="btn btn-raised btn-sm btn-primary mt-2">
							Send
						</button>
					</div>
				</form>
				<hr />
				<div className="col-md-8 col-md-offset-2">
					<h3 className="text-primary">{comments.length} Comments</h3>
					<hr />
					{comments.map((comment, i) => (
						<div key={i}>
							<div>
								<Link to={`/user/${comment.postedBy._id}`}>
									<img
									style={{borderRadius: "100%"}}
									className="img-thumbnail float-left mr-2"
									height="30px"
									width="30px"
									onError={i => (i.target.src = `${DefaultProfile}`)}
									src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
									alt={comment.postedBy.name} 
									/>
								</Link>
								<div>
									<p 
									className="lead">{comment.postedBy.name}</p>
									<p>{comment.text}</p>
								</div>
								{isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
								<>
									<span 
									onClick={() => this.deleteComment(comment)}
									className="text-warning">
										Remove
									</span>
								</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};
};

export default Comment;
