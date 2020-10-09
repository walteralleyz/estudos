import React, {Component} from "react";
import {Link} from "react-router-dom";
import {list} from "./api_user";
import DefaultImage from "../images/avatar_profile.jpg";

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
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
					<h5 className="card-title">{user.name}</h5>
					<p className="card-text">{user.email}</p>
					<Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View Profile</Link>
				</div>
			</div>
		})}
		</div>
	);

	componentDidMount() {
		list().then(data => {
			if(data.error) console.log(data.error);
			this.setState({users: data});
		});
	};

	render() {
		const {users} = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Users</h2>
				{this.renderUsers(users)}
			</div>
		);
	};
};

export default Users;
