const repository = require('../models/repository/Repository');
const { EnsaioDancarino } = require('../models/index');

class EnsaioDancarinoService {

    static async findById(idDancarino) {
        const ensaioDancarino = await repository.findById(EnsaioDancarino, idDancarino);
        if(!ensaioDancarino) throw new EntityNotFoundException('Não foi encontrado dançarino vinculado ao ensaio.')

        return ensaioDancarino;
    }

    static async save(dancarinoEnsaioFields) {
        return await repository.save(EnsaioDancarino, dancarinoEnsaioFields);
    }




}

module.exports = EnsaioDancarinoService;