const Post = require("../models/post");

exports.getPosts = (req, res) => {
	const posts = Post.find()
	.then(posts => {
		res.json({posts});
	})
	.catch(error => res.json({error}));
};

exports.createPost = (req, res) => {
	const post = new Post(req.body);
	post.save()
	.then(result => {
		res.json({
			post: result
		});
	});
};
