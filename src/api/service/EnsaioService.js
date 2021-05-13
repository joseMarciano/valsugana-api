const repository = require('../models/repository/Repository');
const { Ensaio, EnsaioDancarino, Dancarino, PessoaFisica } = require('../models/index');
const dancarinoService = require('../service/DancarinoService');
const _ = require('lodash');
const ValidationException = require('../handler/ValidationException');
const EntityNotFoundException = require('../handler/EntityNotFoundException');
const EnsaioRepresentation = require('../models/representation/EnsaioRepresentation');
const parseOptions = require('../../utils/parseOptions');


class EnsaioService {

    static async list(options = {}) {
        options = { ...parseOptions(options), ...EnsaioRepresentation.listagem() };
        return await repository.findAll(Ensaio, options);
    }

    static async findById(idEnsaio) {
        const options = EnsaioRepresentation.completa();

        const ensaioModel = await repository.findById(Ensaio, idEnsaio, options);
        if (!ensaioModel) throw new EntityNotFoundException('Ensaio não encontrado.')
        return ensaioModel;
    }


    static async create({ descricao, dancarinos = [] }, transaction) {
        dancarinos = dancarinos.filter((value, index) => dancarinos.indexOf(value) === index).map((value) => value);

        if (_.isEmpty(dancarinos)) throw new ValidationException('É obrigatório existir pelo menos um dançarino cadastrado no ensaio')

        for (let dancarino of dancarinos) {
            await dancarinoService.findById(dancarino);
        }

        const ensaioModel = await repository.save(Ensaio, { descricao }, { transaction: transaction });

        for (const dancarino of dancarinos) {
            await repository.save(EnsaioDancarino, { dancarinoId: dancarino, ensaioId: ensaioModel.id }, { transaction: transaction })
        }

        return ensaioModel;
    }

    // static async update(ensaio, idEnsaio) {
    //     const options = { where: { id: idEnsaio } };
    //     return await repository.update(ensaio, Ensaio, options);
    // }

    static async pagination(options = {}) {
        options = { ...parseOptions(options), ...EnsaioRepresentation.listagem() };
        return await repository.pagination(Ensaio, options);
    }


    static async deleteById(idEnsaio) {
        const options = { where: { id: idEnsaio } }
        return await repository.destroy(Ensaio, options);
    }

}

module.exports = EnsaioService;