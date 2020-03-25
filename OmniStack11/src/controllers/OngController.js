//Permite criar um string com caracteres aleatorios
const crypto = require('crypto');
//Importa a conexão criada com o banco
const connection = require('../database/connection');

module.exports = {
    //Listar todas as ONGs
    async index (request, response) {
        //Query para retornar todas as ONGs cadastradas
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    //Cadastrar ONG
    async create(request, response) {
        //Recebe o corpo da mensagem da requisição POST
        const { name, email, whatsapp, city, uf } = request.body;
        //Cria uma id aleatoria para a ONG
        const id = crypto.randomBytes(4).toString('HEX');
        //Salva no banco os dados recebidos
        //Utilizar o parametro await para não da um return antes do insert acabar
        console.log(id);
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    }
};