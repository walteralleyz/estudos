const router = require("express").Router(),
controller = require("../controller/post.js"),
auth = require("../controller/auth.js"),
helpers = require("../helpers"),
user = require("../controller/user.js"),

{ createPostValidator } = helpers,
{ userById } = user,

{ getPosts, 
createPost, 
postsByUser, 
postById, 
isPoster, 
deletePost, 
updatePost,
postPhoto,
singlePost,
like, unlike,
comment, uncomment } = controller,

{ requireSignin } = auth;

router.get("/posts", getPosts);

router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);


router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);


router.get("/post/photo/:postId", postPhoto);
router.get("/post/:postId", singlePost);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
router.get("/posts/by/:userId", requireSignin, postsByUser); 
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
