const router = require("express").Router(),
{
    setToken,
    validateUser,

} = require("../controllers/user.js");

router.get("/login", validateUser);

module.exports = router;