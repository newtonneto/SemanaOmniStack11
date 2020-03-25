//Importa o Knex e seu arquivo de configuração
const knex = require('knex');
const configuration = require('../../knexfile');
//Cria a conexão com o banco informado no arquivo de configuração
const connection = knex(configuration.development);

//Exporta a conexão
module.exports = connection;