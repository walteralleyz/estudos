import React, {Component} from "react";
import {follow, unfollow} from "./api_user";

class FollowButton extends Component {

	followClick = () => {
		this.props.onButtonClick(follow);
	};
	
	unfollowClick = () => {
		this.props.onButtonClick(unfollow);
	};

	render() {
		return (
			<div className="d-inline-block mt-5">
				{!this.props.following ? (

					<button
					onClick={this.followClick} 
					className="btn btn-success btn-raised mr-5">
					Follow
					</button>
				) : (
					<button
					onClick={this.unfollowClick} 
					className="btn btn-warning btn-raised mr-5">
					Unfollow
					</button>	

				)}			
			</div>
		);
	};
};

export default FollowButton;
