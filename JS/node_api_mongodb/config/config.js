
// instanciando ambiente do node em uma variável
const env = process.env.NODE_ENV || 'dev';

const config = () => {
	switch(env) {
		case 'dev':
		// retorna um objeto com as chaves do produto
		return {
			bd_string: "mongodb+srv://user_admin:Zdwlgyd2VACxIkQB@clusterestudonode-akvmc.mongodb.net/test?retryWrites=true",
			jwt_pass: 'batatafrita2019',
		}

		case 'hml':
		return {
			bd_string: "mongodb+srv://user_admin:Zdwlgyd2VACxIkQB@clusterestudonode-akvmc.mongodb.net/test?retryWrites=true",
			jwt_pass: 'batatafrita2019'
		}

		case 'prod':
		return {
			bd_string: "mongodb+srv://user_admin:Zdwlgyd2VACxIkQB@clusterestudonode-akvmc.mongodb.net/test?retryWrites=true",
			jwt_pass: 'batatafrita2019'
		}
	};
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
