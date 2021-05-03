const mainRoute = require('express').Router();
const pessoaFisicaRoute = require('./routes/pessoaFisicaRoute');
const errorHandler = require('./handler/error');

mainRoute
    .use('/pessoa-fisica',pessoaFisicaRoute)
    .use(errorHandler);


module.exports = mainRoute;