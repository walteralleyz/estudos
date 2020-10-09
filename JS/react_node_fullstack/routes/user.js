const router = require("express").Router(),
user = require("../controller/user.js"),
auth = require("../controller/auth.js"),

{ userById, 
allUsers, 
getUser, 
updateUser, 
deleteUser, 
userPhoto,
addFollowing,
addFollower,
removeFollowing,
removeFollower,
findPeople } = user,

{ requireSignin } = auth;

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);
router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);
router.get("/users/findpeople/:userId", requireSignin, findPeople);

// photo
router.get("/user/photo/:userId", userPhoto);

router.param("userId", userById);

module.exports = router;
