const repository = require('../models/repository/Repository');
// const ensaioService = require('../service/EnsaioService');
const { Chamada, DancarinoChamada } = require('../models/index');
const ValidationException = require('../handler/ValidationException');
const parseOptions = require('../../utils/parseOptions');
const ChamadaRepresentation = require('../models/representation/ChamadaRepresentation');
const EntityNotFoundException = require('../handler/EntityNotFoundException');
// const _ = require('lodash');


class ChamadaService {

    static async list(options = {}) {
        options = { ...parseOptions(options), ...ChamadaRepresentation.listagem() };
        return await repository.findAll(Chamada, options);
    }

    static async findById(idChamada) {
        const options = ChamadaRepresentation.completa();

        const chamadaModel = await repository.findById(Chamada, idChamada, options);
        if (!chamadaModel) throw new EntityNotFoundException('Chamada não encontrada.')
        return chamadaModel;
    }


    static async create({ descricao, vigencia, ensaioId, dancarinos = [] }, transaction) {

        dancarinos = dancarinos
            .filter(d => !!d && !!d.ensaioDancarinoId)
            .map(d => d);
        dancarinos.forEach(danc => {
            const hasDuplicity =
                dancarinos.filter(dancarino => dancarino.ensaioDancarinoId === danc.ensaioDancarinoId).length > 1;
            if (hasDuplicity) throw new ValidationException('Não é permitido dançarinos duplicados na chamada');
        });

        const chamadaModel = await repository.save(Chamada, { descricao, vigencia, ensaioId: ensaioId }, { transaction: transaction });

        for (const { ensaioDancarinoId, observacao, presente } of dancarinos) {

            await repository.save(DancarinoChamada, { observacao, presente, ensaioDancarinoId, chamadaId: chamadaModel.id }, { transaction: transaction });
        }

        return chamadaModel;
    }

    static async update({ id, descricao, vigencia, ensaioId, dancarinos = [] }, idChamada, transaction) {
        let options = { where: { id: idChamada }, transaction: transaction };
        await repository.update(Chamada, { descricao, vigencia, ensaioId }, options);
        const chamadaId = id;

        for (const { id, ensaioDancarinoId, observacao, presente } of dancarinos) {
            options.where.id = id;
            await repository.update(DancarinoChamada, {
                observacao,
                presente,
                ensaioDancarinoId,
                chamadaId
            }, options);
        }
    }

    static async pagination(options = {}) {
        options = { ...parseOptions(options), ...ChamadaRepresentation.listagem() };
        return await repository.pagination(Chamada, options);
    }


    static async deleteById(idEnsaio) {
        const options = { where: { id: idEnsaio } }
        return await repository.destroy(Chamada, options);
    }

}

module.exports = ChamadaService;




//TODO.... INICIAR SPECIFICATIONS DE CHAMADA, E DANCARINOS CHAMADA