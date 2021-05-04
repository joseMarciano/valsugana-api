const _ = require('lodash');

const exceptionsToResolve = new Map([
    ['SequelizeValidationError', { status: 422, callback: resolveSequelizeValidation }]
])



module.exports = (error, req, res, next) => {
    let status = 500, message = 'Ocorreu um erro interno no servidor.';

    for (const [key, value] of exceptionsToResolve) {
        const currentException = exceptionsToResolve.get(error.name);
        if (currentException) {
            status = value.status;
            message = error.message;
            if (error.name === 'SequelizeValidationError') message = value.callback(error);
            break;
        }
    }

    console.error(error);
    return resp(res, status, message);
}

function resolveSequelizeValidation({ errors }) {
    return errors[0].message;
}

function resp(res, status, message) {
    return res.status(status).json({ error: { message: message, status: status } });
}