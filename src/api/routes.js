const mainRoute = require('express').Router();
const pessoaFisicaRoute = require('./routes/pessoaFisicaRoute');
const dancarinoRoute = require('./routes/dancarinoRoute');
const errorHandler = require('./handler/error');

mainRoute
    .use('/pessoa-fisica',pessoaFisicaRoute)
    .use('/dancarino',dancarinoRoute)
    .use(errorHandler);


module.exports = mainRoute;