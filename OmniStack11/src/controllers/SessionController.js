//Importa a conexão criada com o banco
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        //Recebe o corpo da mensagem da requisição POST
        const { id } = request.body;

        //Recebe a tupla com o ID recebido
        const ong = await connection('ongs')
            .where('id', id) //Filtra pelo ID recebido na requisição
            .select('name') //Seleciona apenas o nome, pois somente isso será retornado para o front
            .first(); //Como será retornado apenas um resultado, usa o first para a variavel ong não virar um array
        
        //Verifica se a ONG existe
        if (!ong) {
            //O Status 400 - Bad Request, retorno quando algo da errado
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ong);
    }
}