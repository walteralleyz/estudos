const express = require('express');
// depois de importar express, devemos instanciar a função que inicia o express.
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

// aqui estamos importando os objetos de rotas, uma para tratar a raiz, outra para trata o caminho users
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on("error", (err) => {
    console.log(`Erro na conexão com o banco de dados: ${err}`);
})

mongoose.connection.on("disconnected", () => {
    console.log("Aplicação desconectada com o banco de dados!");
})

mongoose.connection.on("connected", () => {
    console.log("Aplicação conectada com o banco de dados!");
})

// BODY PARSER
// permite receber os dados enviados no método POST em json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// o app use permite dividir as rotas em modulos e trabalhar com elas de forma individual
// dentro do objeto app.use eu defino a rota de requisição e o objeto de resposta
// esse objeto deve ser outro js tratado.
app.use('/', indexRoute);
app.use('/users', usersRoute);

// o express utiliza o método listen para ouvir uma porta de requisições, nesse caso 3000
app.listen(3000);

module.exports = app;
