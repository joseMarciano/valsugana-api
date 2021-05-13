const service = require('../service/EnsaioService');
const { sequelize } = require('../models/index');

class EnsaioController {

    static async list(req, res, next) {
        try {
            return res.status(200).json(await service.list(req.query.options));
        } catch (error) {
            next(error);
        }
    }

    static async findById(req, res, next) {
        try {
            const { id } = req.params;
            return res.status(200).json(await service.findById(id));
        } catch (error) {
            next(error);
        }
    }

    static async pagination(req, res, next) {
        try {
            return res.status(201).json(await service.pagination(req.query.options));
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { ensaio } = req.body;
            const ensaioModel = await service.create(ensaio, transaction );
            await transaction.commit();
            return res.status(201).json(ensaioModel);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    // static async update(req, res, next) {
    //     try {
    //         const { pessoaFisica } = req.body;
    //         const { id } = req.params;
    //         return res.status(201).json(await service.update(pessoaFisica, id));
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            return res.status(204).json(await service.deleteById(id));
        } catch (error) {
            next(error);
        }
    }


}

module.exports = EnsaioController;