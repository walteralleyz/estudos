const app = require("express")(),
http = require("http").createServer(app),
dotenv = require("dotenv").config(),
morgan = require("morgan"),
mongoose = require("mongoose"),
bodyParser = require("body-parser"),
cookieParser = require("cookie-parser"),
socket = require("socket.io")(http, {path: "/messages"}),
expressValidator = require("express-validator"),
cors = require("cors");

auth_route = require("./routes/auth"),
mongoose_uri = process.env.MONGOOSE_URI,
port = process.env.PORT;

mongoose.connect(mongoose_uri, 
    { useNewUrlParser: true,
      useCreateIndex: true},
    (error) => {
    if(error) console.log("Database error: ", error);
    console.log("Conectado ao Banco!");
});

socket.on("connection", (client) => {
    client.on("message", (data) => {
        socket.emit("received", data);
    });
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(cors("*"));

app.use("/", auth_route);

app.get("/", (req, res) => {
    res.json({
        success: "Api do Real chat Node!"
    })
});

http.listen(port, () => {
    console.log("Rodando na porta: ", port);
});