const app = require("express")(),
morgan = require("morgan"),
bodyParser = require("body-parser"),
cookieParser = require("cookie-parser"),
mongoose = require("mongoose"),
dotenv = require("dotenv").config(),
fs = require("fs"),
expressValidator = require("express-validator"),
cors = require("cors"),

postRoutes = require("./routes/post.js"),
authRoutes = require("./routes/auth.js"),
userRoutes = require("./routes/user.js"),

port = process.env.PORT || 8080,
mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri, { useNewUrlParser: true })
.then(() => console.log("Conectado ao DB!"));
mongoose.connection.on("error", err => console.log("Erro na conexão do DB: ", err.message));

app.get("/", (req, res) => {
	fs.readFile("docs/api_docs.json", (err, data) => {
		if(err) return res.status(400).json(err);
		const docs = JSON.parse(data);
		res.json(docs);
	});
});

app.use(expressValidator());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use((err, req, res, next) => {
	if(err.name === "UnauthorizedError") return res.status(401).json({
		message: "Unauthorized!"
	});
});


app.listen(port, () => console.log(`Ouvindo na porta ${port}`));
