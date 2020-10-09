const express = require('express');
// depois de importar o express, devemos iniciar a função router que vai separar a resposta para as rotas
const router = express.Router();
const auth = require('../middlewares/auth');

// aqui estamos trabalhando com as requisições GET, que geralmente aguardam uma resposta de dados
router.get('/', auth, (req, res) => {
	console.log(res.locals.auth_data);
    return res.send({message: 'Tudo ok com o método GET da raiz!'})
})

// aqui estamos trabalhando com POST, que envia dados ao servidor e retorna uma resposta
router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o método POST da raiz!'})
})

// module exports é equivalente ao export default usado no React e ES6+;
module.exports = router;


