const repository = require('../models/repository/Repository');
const { PessoaFisica } = require('../models/index');

class PessoaFisicaService {

    static async list(options = {}) {
        return await repository.findAll(PessoaFisica, options);
    }

    static async findById(idPessoaFisica) {
        return await repository.findById(PessoaFisica, idPessoaFisica);
    }

    static async save(pessoaFisicaFields) {
        return await repository.save(PessoaFisica, pessoaFisicaFields);
    }
    static async update(pessoaFisica, idPessoaFisica) {
        const options = { where: { id: idPessoaFisica } };
        return await repository.update(PessoaFisica, pessoaFisica, options);
    }

    static async pagination(options = {}) {
        return await repository.pagination(PessoaFisica, options);
    }

    static async deleteById(idPessoaFisica) {
        const options = { where: { id: idPessoaFisica } }
        return await repository.destroy(PessoaFisica, options);
    }

}

module.exports = PessoaFisicaService;