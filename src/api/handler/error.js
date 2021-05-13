const _ = require('lodash');

const exceptionsToResolve = new Map([
    ['SequelizeValidationError', { status: 422, callback: resolveSequelizeValidation }],
    ['ValidationException', { status: 422, callback: resolveCommonException }],
    ['EntityNotFoundException', { status: 422, callback: resolveCommonException}],
    ['SequelizeForeignKeyConstraintError', { status: 422, callback: resolveConstraintException}]
])



module.exports = (error, req, res, next) => {
    let status = 500,message = 'Ocorreu um erro interno no servidor.';

    const currentException = exceptionsToResolve.get(error.name);

    if(currentException){
        status = currentException.status;
        message = currentException.callback(error)
    }

    console.error(error);
    return resp(res, status, message);
}

function resolveSequelizeValidation({ errors }) {
    return errors[0].message;
}

function resolveCommonException(error) {
    return error.message;
}

function resolveConstraintException(error) {
    return 'Não foi possível deletar pois essa entidade está em uso.';
}

function resp(res, status, message) {
    return res.status(status).json({ error: { message: message, status: status } });
}