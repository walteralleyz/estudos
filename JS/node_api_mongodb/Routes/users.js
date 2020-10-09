const express = require('express');
const router = express.Router();
const users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
	return jwt.sign({id: userId}, config.jwt_pass, {expiresIn: '7d'});
};

router.get('/', async (req, res) => {
	try {
		const user = await users.find({});
	}
	catch (err) {
		return res.status(500).send({error: "Erro na consulta"});
	}
});

// essa rota é adicional, complementa a rota /users, ficando /users/create
router.post('/create', async (req, res) => {
	const {email, password} = req.body;
	if(!email || !password) return res.status(400).send({error: "Dados insuficientes!"});

	try {
		if(await users.findOne({email})) return res.status(400).send({error: "Usuário já registrado"});
		const user = await users.create(req.body);
		user.password = undefined;

		return res.send({user, token: createUserToken(user.id)});

	}
	catch(err) {
		return res.send({error: err});
	};
});

router.post('/auth', async (req, res) => {
	const {email, password} = req.body;
	if(!email || !password) return res.status(400).send({error: "Dados insuficientes!"});
	
	try {
		const user = await users.findOne({email}).select('+password');
		if(!user) return res.status(400).send({error: "Usuário não registrado"});

		const pass_ok = await bcrypt.compare(password, user.password);
		if(!pass_ok) return res.status(401).send({error: "Erro ao autenticar o usuário"});

		user.password = undefined;
		return res.send({user, token: createUserToken(user.id)});
	}
	catch(err) {
		return res.status(500).send({error: err});
	};
});

module.exports = router;

/*

200 = ok
201 = created
202 = accepted

400 = bad request
401 = unauthorized -- autenticacao, caráter temporário
403 = forbidden -- autorizacao, carater permanente
404 = not found

500 = internal server error
501 = not implemented -- a API não suporta essa funcionalidade
503 = service unavailable - a API executa, mas no momento está indisponivel


*/
