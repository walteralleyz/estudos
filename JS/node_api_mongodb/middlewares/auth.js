const jwt = require('jsonwebtoken');
const config = require('../config/config');

// função de verificação de token
const auth = (req, res, next) => {
	// recebe o token do headers da request
	const token_header = req.headers.auth;
	// retorna codigo de erro
	if(!token_header) return res.status(401).send({error: 'Token não enviado!'});
	
	jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
		if(err) return res.status(401).send({error: 'Token inválido'});
		// dados do usuario decodados
		res.locals.auth_data = decoded;
		return next();
	});
};

module.exports = auth;
