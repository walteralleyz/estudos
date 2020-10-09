import React, {Component} from "react";
import {Redirect, Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {read} from "./api_user";
import DefaultImage from "../images/avatar_profile.jpg";
import DeleteUser from "./delete_user.js";
import FollowButton from "./follow_button";
import ProfileTabs from "./profile_tabs";
import {listByUser} from "../post/api_post";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {following: [], followers: []},
			redirectToSignin: false,
			error: "",
			posts: "",
			following: false
		};
	};

	checkIsFollowing = user => {
		const jwt = isAuthenticated();
		const matched = user.followers.find(follower => {
			return follower._id === jwt.user._id;
		});
		return matched;
	};

	clickFollowButton = callApi => {
		const user_id = isAuthenticated().user._id;
		const token = isAuthenticated().message;
		callApi(user_id, token, this.state.user._id)
		.then(data => {
			if(data.error) return this.setState({error: data.error});
			this.setState({user: data.user, following: !this.state.following});
		});
	};

	init = userId => {
		const token = isAuthenticated().message;
		read(userId, token)
		.then(data => {
			if(data.error) return this.setState({redirectToSignin: true});
			let following = this.checkIsFollowing(data.user);
			this.setState({user: data.user, following});
			this.loadPosts(data.user._id, token);
		});
	};

	loadPosts = (userId, token) => {
		listByUser(userId, token).then(data => {
			if(data.error) console.log(data.error);
			this.setState({posts: data});
		})
	};

	componentDidMount() {
		const user_id = this.props.match.params.userId;
		this.init(user_id);
	};

	componentWillReceiveProps(props) {
		const user_id = props.match.params.userId;
		this.init(user_id);
	};

	render() {	
		const {redirectToSignin, user, posts} = this.state;
		const photo = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultImage;
		if(redirectToSignin) return <Redirect to="/signin" />;	
		return (
			<div className="container">				
				<h2 className="mt-5 mb-5">Profile</h2>
				<div className="row">
					<div className="col-lg-4 md-12">
						<img 
						style={{height: "200px", width: "auto", borderRadius: "100%"}}
						className="img-thumbnail"
						src={photo} 
						onError={i => (i.target.src=`${DefaultImage}`)}
						alt={user.name} 
						/>
					</div>
					<div className="col-lg-8 md-12">
						<div className="lead">
							<p>Name: {`${this.state.user.name}`}</p>
							<p>Email: {`${this.state.user.email}`}</p>
							<p>Joined: {`${new Date(
								this.state.user.created
							)}`}</p>
						</div>
						{isAuthenticated().user && isAuthenticated().user._id === this.state.user._id ? (
						<div className="d-inline-block">
							<Link to={`/post/create`} 
							className="btn btn-raised btn-primary mr-5">
								Create Post
							</Link>
							<Link to={`/user/edit/${user._id}`} 
							className="btn btn-raised btn-success mr-5">
								Edit Profile
							</Link>
							<DeleteUser userId={user._id}/>
						</div>
						) : (
							<FollowButton 
							following={this.state.following}
							onButtonClick={this.clickFollowButton}
							/>
						)}
					</div>
				</div>
				<div className="row">
					<div className="col md-12 mt-5 mb-5">
						<hr />
						<p className="lead">{user.about}</p>
						<hr />
						<ProfileTabs 
						followers={user.followers} 
						following={user.following} 
						posts={posts}
						/>
					</div>
				</div>
			</div>
		);
	};
};

export default Profile;
