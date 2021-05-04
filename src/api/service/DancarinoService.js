const repository = require('../models/repository/Repository');
const { Dancarino } = require('../models/index');

class DancarinoService {

    static async list(options = {}) {
        return await repository.findAll(Dancarino, options);
    }

    static async findById(idDancarino) {
        return await repository.findById(Dancarino, idDancarino);
    }

    static async save(dancarinoFields) {
        return await repository.save(Dancarino, dancarinoFields);
    }
    static async update(dancarino, idDancarino) {
        const options = { where: { id: idDancarino } };
        return await repository.update(Dancarino, dancarino, options);
    }

    static async pagination(options = {}) {
        return await repository.pagination(Dancarino, options);
    }

    static async deleteById(idDancarino) {
        const options = { where: { id: idDancarino } }
        return await repository.destroy(Dancarino, options);
    }

}

module.exports = DancarinoService;