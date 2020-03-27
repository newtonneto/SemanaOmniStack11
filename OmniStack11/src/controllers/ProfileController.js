//Importa a conexão criada com o banco
const connection = require('../database/connection');

module.exports = {
    //Lista os casos especificos de uma ONG
    async index(request, response) {
        //Recebe o ID da ONG logada
        const ong_id = request.headers.authorization;
        
        //Query para retornar todas os casos cadastrados pela ONG informada
        const incidents = await connection('incidents')
            .where('ong_id', ong_id) //Filtra pela ONG especifica
            .select('*');
        
        return response.json(incidents);
    }
}