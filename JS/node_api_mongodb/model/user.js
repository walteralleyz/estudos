const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// criação do banco de dados e regras para alocação de dados
const userSchema = new Schema({
	email: {type: String, required: true, unique: true, lowercase: true},
	password: {type: String, required: true, select: false},
	created: {type: Date, default: Date.now}
});

// executa antes da função userSchema
userSchema.pre('save', async function(next) {
	let user = this;
	// verifica a senha, se modificada passa
	if(!user.isModified('password')) return next();

	// senão encripta a senha
	user.password = await bcrypt.hash(user.password, 10);
	return next();
});

module.exports = mongoose.model("User", userSchema);
