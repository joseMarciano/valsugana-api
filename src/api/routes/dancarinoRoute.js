const dancarinoRoute = require('express').Router();
const DancarinoController = require('../controller/DancarinoController');

dancarinoRoute
    .get('/', DancarinoController.list)
    .get('/page', DancarinoController.pagination)
    .get('/:id', DancarinoController.findById)
    .post('/', DancarinoController.create)
    .put('/:id', DancarinoController.update)
    .delete('/:id', DancarinoController.delete);


module.exports = dancarinoRoute;