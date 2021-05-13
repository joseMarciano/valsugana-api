const repository = require('../models/repository/Repository');
const { Dancarino } = require('../models/index');
const EntityNotFoundException = require('../handler/EntityNotFoundException');
const DancarinoRepresentation = require('../models/representation/DancarinoRepresentation');
const parseOptions = require('../../utils/parseOptions');
const { Op } = require('sequelize');
class DancarinoService {

    static async list({ options = {}, vigencia = null }) {
        options = { ...parseOptions(options), ...DancarinoRepresentation.listagem() };

        if (!options.where && vigencia) options.where = { vigencia: { [Op.lte]: vigencia } };
        else if (options.where && vigencia) options.where = { ...options.where, vigencia: { [Op.lte]: vigencia } }
        
        return await repository.findAll(Dancarino, options);
    }

    static async findById(idDancarino) {
        const options = { ...DancarinoRepresentation.completa() }
        const dancarino = await repository.findById(Dancarino, idDancarino, options);

        if (!dancarino) throw new EntityNotFoundException('Dançarino não encontrado.')

        return dancarino;
    }

    static async save(dancarinoFields) {
        return await repository.save(Dancarino, dancarinoFields);
    }
    static async update(dancarino, idDancarino) {
        const options = { where: { id: idDancarino } };
        return await repository.update(Dancarino, dancarino, options);
    }

    static async pagination({options = {}, vigencia = null}) {
        options = { ...parseOptions(options), ...DancarinoRepresentation.listagem() };

        if (!options.where && vigencia) options.where = { vigencia: { [Op.lte]: vigencia } };
        else if (options.where && vigencia) options.where = { ...options.where, vigencia: { [Op.lte]: vigencia } }
        

        return await repository.pagination(Dancarino, options);
    }

    static async deleteById(idDancarino) {
        const options = { where: { id: idDancarino } }
        return await repository.destroy(Dancarino, options);
    }

}

module.exports = DancarinoService;