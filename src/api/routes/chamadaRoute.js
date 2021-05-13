const chamadaRoute = require('express').Router();
const ChamadaController = require('../controller/ChamadaController');

chamadaRoute
    .get('/', ChamadaController.list)
    .get('/page', ChamadaController.pagination)
    .get('/:id', ChamadaController.findById)
    .post('/', ChamadaController.create)
    .put('/:id', ChamadaController.update)
    .delete('/:id', ChamadaController.delete);

module.exports = chamadaRoute;