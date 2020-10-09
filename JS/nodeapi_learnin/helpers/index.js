exports.createPostValidator = (req, res, next) => {
	req.check("title", "Write a title").notEmpty();
	req.check("title", "Title must between 4 to 150 characters").isLength({
		min: 4,
		max: 150
	});

	req.check("body", "Write a body").notEmpty();
	req.check("body", "Body must between 4 to 1000 characters").isLength({
		min: 4,
		max: 1000
	});

	const errors = req.validationErrors();
	if(errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(404).json({error: firstError});
	};
	
	next();
};
