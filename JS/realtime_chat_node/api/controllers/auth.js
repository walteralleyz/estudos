const User = require("../models/user"),
jwt = require("jsonwebtoken"),
expressJwt = require("express-jwt"),
dotenv = require("dotenv").config();

//metodo criado para validar o cadastro de um novo
// usuario no sistema
exports.signup = async (req, res) => {
    // decompoe username do corpo da requisicao
    const {username} = req.body,
    // procura por username no banco de dados, sendo unico
    user_exists = await User.findOne({username}, (err, result) => {
        // se retornar usuario ou erro
        // retorna mensagem dizendo que o usuario ja existe
        if(err || result) return res.status(403).json({
            error: "Usuário já possui cadastro!"
        });
        // do contrário, popula um novo modelo do mongoose
        const user = new User(req.body);
        user.save(error => {
            // trata erro
            if(error) return res.status(400).json({
                error
            })
            // salva e envia a resposta
            res.json({
                message: "Success!"
            })
        })
    });
};

// metodo de validação do usuário
exports.signin = async (req, res) => {
    // decompoe username e password do corpo da requisicao
    const {username, password} = req.body,
    // busca usuario unico no banco de dados
    user_validate = await User.findOne({username}, (error, result) => {
        // trata erros
        if(error || !result) return res.status(401).json({
            error: "Usuário inválido. Crie uma conta!"
        });

        // verifica se a senha do usuario e correta
        // usando um metodo criado dentro do proprio esquema
        // se false devolve mensagem
        if(!result.authenticate(password)) return res.status(401).json({
            error: "Nome de usuário ou senha não existem!"
        });

        // se true, cria o token com expiração
        const token = jwt.sign(
            {_id: result._id},
            process.env.JWT_SECRET);
        const {_id, username} = result;
        // envia um cookie e retorna o usuario
        res.cookie("t", token, {expire: new Date() + 9999});
        return res.json({
            token,
            user: { _id, username }
        })
    })
};

// metodo para limpar o cookie do navegador
exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({
        success: "Signout success!"
    })
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})