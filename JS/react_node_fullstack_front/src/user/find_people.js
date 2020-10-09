import React, {Component} from "react";
import {Link} from "react-router-dom";
import {findPeople, follow} from "./api_user";
import {isAuthenticated} from "../auth";

import DefaultImage from "../images/avatar_profile.jpg";

class FindPeople extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			error: "",
			open: false
		};
	};

	clickFollow = (user, i) => {
		const user_id = isAuthenticated().user._id;
		const token = isAuthenticated().message;
		
		follow(user_id, token, user._id)
		.then(data => {
			if(data.error) return this.setState({error: data.error});
			let to_follow = this.state.users;
			to_follow.splice(i, 1);
			this.setState({
				users: to_follow,
				error: "",
				open: true,
				follow_message: `Following ${user.name}`
			});
		}); 
	};

	renderUsers = users => (
		<div className="row">
		{users.map((user, i) => {
			return <div className="card col-lg-4 md-12" key={i}>
				<img 
				style={{height: "200px", width: "auto"}}
				className="img-thumbnail"
				src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`}
				onError={i => (i.target.src=`${DefaultImage}`)}
				alt={user.name} 
				/>
				<div className="card-body">
					<h5 className="card-title">
						{user.name}
					</h5>
					<p className="card-text">
						{user.email}
					</p>
					<Link to={`/user/${user._id}`} 
					className="btn btn-raised btn-sm btn-primary">
						View Profile
					</Link>
					<button 
					onClick={() => this.clickFollow(user, i)}
					className="btn btn-raised btn-info float-right btn-sm">
						Follow
					</button>
				</div>
			</div>
		})}
		</div>
	);

	componentDidMount() {
		const user_id = isAuthenticated().user._id;
		const token = isAuthenticated().message;

		findPeople(user_id, token).then(data => {
			if(data.error) console.log(data.error);
			this.setState({users: data});
		});
	};

	render() {
		const {users, open, follow_message} = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Find People</h2>

				<div>
					{open && (
						<div className="alert alert-success">
							<p>{follow_message}</p>
						</div>
					)}
				</div>
				{this.renderUsers(users)}
			</div>
		);
	};
};

export default FindPeople;
