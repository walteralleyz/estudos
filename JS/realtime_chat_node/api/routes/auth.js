const router = require("express").Router(),
{
    signup,
    signin,
    signout
} = require("../controllers/auth"),

{userSignupValidator} = require("../helpers/validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;