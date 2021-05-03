const pessoaFisicaRoute = require('express').Router();
const PessoaFisicaController = require('../controller/PessoaFisicaController');

pessoaFisicaRoute
    .get('/', PessoaFisicaController.list)
    .get('/page', PessoaFisicaController.pagination)
    .get('/:id', PessoaFisicaController.findById)
    .post('/', PessoaFisicaController.create)
    .put('/:id', PessoaFisicaController.update)
    .delete('/:id', PessoaFisicaController.delete);

module.exports = pessoaFisicaRoute;