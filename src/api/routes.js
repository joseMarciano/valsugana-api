const mainRoute = require('express').Router();
const pessoaFisicaRoute = require('./routes/pessoaFisicaRoute');
const dancarinoRoute = require('./routes/dancarinoRoute');
const ensaioRoute = require('./routes/ensaioRoute');
const chamadaRoute = require('./routes/chamadaRoute');
const errorHandler = require('./handler/error');

mainRoute
    .use('/pessoa-fisica', pessoaFisicaRoute)
    .use('/dancarino', dancarinoRoute)
    .use('/ensaio', ensaioRoute)
    .use('/chamada',chamadaRoute)
    .use(errorHandler);


module.exports = mainRoute;