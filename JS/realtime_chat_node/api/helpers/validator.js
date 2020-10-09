exports.userSignupValidator = (req, res, next) => {
    req.check("username", "Nome de usuário é requerido!").not().isEmpty();
    req.check("username", "Nome de usuário deve ter entre 4 e 10 caracteres.").isLength({
        min: 4,
        max: 10
    });

    req.check("email", "Tamanho do email deve ser entre 4 e 32 caracteres.")
    .matches(/.+\@.+\..+/)
    .withMessage("Email deve conter @.")
    .isLength({
        min: 4,
        max: 32
    });

    req.check("password", "A senha é obrigatória!").not().isEmpty();
    req.check("password")
    .isLength({ min: 6 })
    .withMessage("A senha deve conter pelo menos 6 caracteres!")
    .matches(/\d/)
    .withMessage("A senha deve conter um número.");

    const errors = req.validationErrors();
    if(errors) {
        const first_error = errors.map(error => error.msg);
        return res.status(400).json({
            error: first_error[0]
        })
    };

    next();
};