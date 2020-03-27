//Importa a conexão criada com o banco
const connection = require('../database/connection');

module.exports = {
    //Listar todos os casos
    async index(request, response) {
        //Recebe o valor de page para realizar a paginação, caso for vazio o padrão é 1
        const { page = 1} = request.query;

        //Retorna o total de casos, o retorno será um array, então utilizar o [] para pegar apenas a primeira posição
        const [count] = await connection('incidents').count();

        //Query para retornar todas os casos cadastrados
        const incidents = await connection('incidents')
            .join('ongs', 'ong.id', '=', 'incidents.ong_id') //Da um join na tabela ongs para pegar informações adicionais
            .limit(5) //Limita o resultado por 5 tuplas
            .offset((page - 1) * 5) //Necessario para paginação, o "page - 1" é para não pular 5 resultados quando a pagina for 1
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ong.uf'
            ]); //Não deve ser feito um ong.* para o ong.id não sobrescrever o incidents.id

        //Coloca o valor do total de casos no cabeçalho da resposta
        response.header('X-Total-Count', count['count(*)']); //O parametro "count(*)" foi descoberto dando um console.log(count)

        return response.json(incidents);
    },

    //Cadastra um caso
    async create(request, response) {
        //Recebe o corpo da mensagem da requisição POST
        const { title, description, value } = request.body;
        //Recebe o ID da ONG logada
        const ong_id = request.headers.authorization;

        //Como o insert vai inserir apenas uma tupla, vai ser retornado  um array de apenas 1 posição
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        //Recebe o corpo da mensagem da requisição DELETE
        const { id } = request.params;
        //Recebe o ID da ONG logada
        const ong_id = request.headers.authorization

        //Recebe o ong_id da tupla com o ID informado
        const incident = await connection('incidents')
            .where('id', id) //Informa o ID da tupla
            .select('ong_id') //Seleciona o seu ong_id
            .first(); //Como os IDs são únicos, pegar o primeiro resultado
        
        //Verifica se o ong_id da tupla é o mesmo recebido no request
        if (incident.ong_id != ong_id) {
            //Retorna um Status 401 - Não Autorizado
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        //Se passar, deletar a tupla com o referido id
        await connection('incidents').where('id', id).delete();

        //O Status 204 - Sem Conteúdo, é referente a uma operação que teve sucesso mas não necessita retorna conteúdo
        //O send é necessário para enviar resposta sem conteúdo
        return response.status(204).send();
    }
};