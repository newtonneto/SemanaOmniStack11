//Utiliza o framework express
const express = require('express');
//Importa o controlador de ONG
const OngController = require('./controllers/OngController');
//Importa o controlador de Incident
const IncidentsController = require('./controllers/IncidentController');
//Importa o controlador de Profile
const ProfileController = require('./controllers/ProfileController');
//Importa o controlador de Session
const SessionController = require('./controllers/SessionController');
//Desacopla o modulo de rotas do Node em uma variável
const routes = express.Router();

//Cria uma sessão
routes.post('/sessions', SessionController.create);

//Listar todas as ONGs
routes.get('/ongs', OngController.index);
//Cadastrar ONG
routes.post('/ongs', OngController.create);

//Lista os casos especificos de uma ONG
routes.get('/profile', ProfileController.index);

//Listar todos os casos
routes.get('/incidents', IncidentsController.index);
//Cadastra um caso
routes.post('/incidents', IncidentsController.create);
//Deleta um caso
routes.delete('/incidents/:id', IncidentsController.delete);

//Exporta as rotas criadas
module.exports = routes;