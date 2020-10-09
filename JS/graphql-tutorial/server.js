import express from "express";
import graphqlHTTP from 'express-graphql';
import mongoose from "mongoose";
import schema from "./schema.js";

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect("mongodb+srv://thisadmin:@lleyz5283@studyandtests-akvmc.mongodb.net/test?retryWrites=true", 
{ useNewUrlParser: true });
mongoose.connection.on("open", () => {
    console.log("Connection succesful!");
});

mongoose.connection.on("error", err => console.log(err));

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
    })
);

app.get("/", (req, res) => res.json({success: true, message: "Você acessou!"}));
app.listen(port, () => console.log(`Rodando na porta ${port}`));
