const repository = require('../models/repository/Repository');
const { PessoaFisica } = require('../models/index');
const EntityNotFoundException = require('../handler/EntityNotFoundException');
const parseOptions = require('../../utils/parseOptions');
const PessoaFisicaRepresentation = require('../models/representation/PessoaFisicaRepresentation');

class PessoaFisicaService {

    static async list(options = {}) {
        options = { ...parseOptions(options), ...PessoaFisicaRepresentation.listagem() };
        return await repository.findAll(PessoaFisica, options);
    }

    static async findById(idPessoaFisica) {
        const options = { ...PessoaFisicaRepresentation.completa() }
        const pessoaFisicaModel = await repository.findById(PessoaFisica, idPessoaFisica, options);
        if (!pessoaFisicaModel) throw new EntityNotFoundException("Pessoa física não encontrada.");

        return pessoaFisicaModel;
    }

    static async save(pessoaFisicaFields) {
        return await repository.save(PessoaFisica, pessoaFisicaFields);
    }
    static async update(pessoaFisica, idPessoaFisica) {
        const options = { where: { id: idPessoaFisica } };
        return await repository.update(PessoaFisica, pessoaFisica, options);
    }

    static async pagination(options = {}) {
        options = { ...parseOptions(options), ...PessoaFisicaRepresentation.listagem() };
        return await repository.pagination(PessoaFisica, options);
    }

    static async deleteById(idPessoaFisica) {
        const options = { where: { id: idPessoaFisica } }
        return await repository.destroy(PessoaFisica, options);
    }

}

module.exports = PessoaFisicaService;