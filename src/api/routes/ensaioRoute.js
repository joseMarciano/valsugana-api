const ensaioRoute = require('express').Router();
const EnsaioController = require('../controller/EnsaioController');

ensaioRoute
    .get('/', EnsaioController.list)
    .get('/page', EnsaioController.pagination)
    .get('/:id', EnsaioController.findById)
    .post('/', EnsaioController.create)
    // .put('/:id', EnsaioController.update)
    .delete('/:id', EnsaioController.delete);

module.exports = ensaioRoute;