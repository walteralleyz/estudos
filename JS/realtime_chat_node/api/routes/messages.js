const router = require("express").Router();

router.get("/receive", (req, res) => {
    socket.on("message", (data) => {
        socket.emit("teste")
    })
});

module.exports = router;