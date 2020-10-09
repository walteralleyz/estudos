import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {singlePost, remove, like, unlike} from "./api_post";
import {isAuthenticated} from "../auth";
import DefaultImage from "../images/default.jpg";
import Comment from "./comment.js";

class SinglePost extends Component {
	state = {
		post: "",
		likes: 0,
		deleted: false,
		like: false,
		redirectToSignin: false,
		comments: []
	};

	deletePost = () => {
		const post_id = this.props.match.params.postId;
		const token = isAuthenticated().message;

		let answer = window.confirm("Do you want to delete this post?");
		if(answer) {
			return remove(post_id, token).then(data => {
				if(data.error) console.log(data.error);
				this.setState({deleted: true});
			});
		};
		return false;
	};

	updateComments = comments => {
		this.setState({comments});
	};

	likeToggle = () => {
		let callApi = this.state.like ? unlike : like;
		const user_id = isAuthenticated().user._id;
		const post_id = this.state.post._id;
		const token = isAuthenticated().message;

		callApi(user_id, token, post_id).then(data => {
			if(data.error) console.log(data.error);
			this.setState({ 
				like: !this.state.like,
				likes: data.likes.length
			});
		});
	};

	renderPost = post => {
		const poster_id = post.postedBy ?
		`/user/${post.postedBy._id}` : "";
		const poster_name = post.postedBy ?
		post.postedBy.name : "unknown";

		const {like, likes} = this.state;

		return (
			<div className="card-body">
				<img 
				src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} 
				alt={post.title}
				onError={i => i.target.src = `${DefaultImage}`}
				className="img-thumbnail mb-3"
				style={{height: "300px", width: "100%", objectFit: "cover"}}
				/>

				{like ? (
					<h3 onClick={this.likeToggle}>
						<i 
						className="fa fa-thumbs-up text-success bg-dark"
						style={{padding: "10px", borderRadius: "100%", marginRight: "4px"}}
						 />
						{likes} Likes
					</h3>
				) : (
					<h3 onClick={this.likeToggle}>
						<i 
						className="fa fa-thumbs-up text-warning bg-dark"
						style={{padding: "10px", borderRadius: "100%", marginRight: "4px"}}
						 />
						{likes} Likes
					</h3>
				)}

				<p className="card-text">{post.body}</p>
				<br />
				<p className="font-italic mark">
					Posted by 
					<Link to={`/user/${poster_id}`}>
						{" "}
						{poster_name}
						{" "}
					</Link>
					on {new Date(post.created).toDateString()}
				</p>
				<div className="d-inline-block">
					<Link to={`/`} 
					className="btn btn-raised btn-sm btn-primary mr-5">
						Back to Posts
					</Link>
					{isAuthenticated().user && isAuthenticated().user._id === this.state.post.postedBy._id && (
					<>
						<Link to={`/post/edit/${post._id}`} 
						className="btn btn-raised btn-sm btn-warning mr-5">
							Update Post
						</Link>
						<button 
						onClick={this.deletePost}
						className="btn btn-raised btn-sm btn-warning mr-5">
							Delete Post
						</button>
					</>
					)}
				</div>
			</div>
		);
	};

	checkLike = likes => {
		if(!isAuthenticated()) return this.setState({redirectToSignin: true});
		const user_id = isAuthenticated().user._id;
		let matched = likes.indexOf(user_id) !== -1;
		return matched;
	};

	componentDidMount = () => {
		const post_id = this.props.match.params.postId;

		singlePost(post_id).then(data => {
			if(data.error) console.log(data.error);
			this.setState({
				post: data, 
				likes: data.likes.length, 
				like: this.checkLike(data.likes),
				comments: data.comments
			});
			console.log(data.comments)
		});
	};

	render() {
		const {post, deleted, redirectToSignin, comments} = this.state;
		if(deleted) return <Redirect to="/" />
		if(redirectToSignin) return <Redirect to="/signin" />

		return (
			<div className="container">
				<h2 className="display-2 mt-5 mb-5" 
				style={{textAlign: "center"}}>
					{post.title}
				</h2>
				{!post ? 
				<div className="jumbotron text-center">
					<h2>Loading</h2>
				</div> : 
				this.renderPost(post)}
				<Comment 
				postId={post._id} 
				comments={comments.reverse()} 
				updateComments={this.updateComments} 
				/>
			</div>			
		);
	};
};

export default SinglePost;
