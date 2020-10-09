const express = require("express");
const router = express.Router();
const postController = require("../controller/post");
const validator = require("../helpers/index.js");

router.get("/", postController.getPosts);
router.post("/post", validator.createPostValidator, postController.createPost);

module.exports = router;
