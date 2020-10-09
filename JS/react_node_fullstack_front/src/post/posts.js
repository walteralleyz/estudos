import React, {Component} from "react";
import {Link} from "react-router-dom";
import {listPost} from "./api_post";
import DefaultImage from "../images/default.jpg";

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			error: ""
		};
	};

	renderPosts = posts => {
		return (
			<div className="row">
			{posts.map((post, i) => {
				const poster_id = post.postedBy ? post.postedBy._id : "";
				const poster_name = post.postedBy ? post.postedBy.name : "unknown";
				
				return (
					<div className="card col-lg-4 md-12" key={i}>
						<div className="card-body">
							<img 
							src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} 
							alt={post.title}
							onError={i => i.target.src = `${DefaultImage}`}
							className="img-thumbnail mb-3"
							style={{height: "200px", width: "auto"}}
							/>
							<h5 className="card-title">{post.title}</h5>
							<p className="card-text">{post.body.substring(0, 100)}</p>
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
							<Link to={`/post/${post._id}`} 
							className="btn btn-raised btn-sm btn-primary">
								Read More
							</Link>
						</div>
					</div>
				);
			})}
			</div>
		);
	};

	componentDidMount() {
		listPost().then(data => {
			if(data.error) return this.setState({error: data.error});
			this.setState({posts: data});			
		});
	};

	render() {
		const {posts} = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">{!posts.length ? "Loading..." : "Recent Posts"}</h2>
				{this.renderPosts(posts)}
			</div>
		);
	};
};

export default Posts;
