const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const app = express();

const postRoutes = require("./routes/post");
dotenv.config();

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(() => console.log("DB connected!"));

mongoose.connection.on("error", err => {
	console.log("Error ", err);
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator);
app.use("/", postRoutes);

app.listen(port, () => console.log("executando na porta, ", port))
