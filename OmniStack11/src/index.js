//Utiliza o framework express
const express = require('express');
//Importa o CORS para melhorar a segurança
const cors = require('cors');
//Importa as rotas criadas
const routes = require('./routes');

const app = express();

//Faz a aplicação utilizar o CORS
/* app.use(cors({
    origin: 'http://meuapp.com' //Especifico os endereços que poderam acessar a API
})); */
app.use(cors());
//Faz a aplicação entender dados recebidos em formato Json, convertendo para objeto JavaScript
app.use(express.json());
//Possibilita o uso das rotas
app.use(routes);

app.listen(3333);