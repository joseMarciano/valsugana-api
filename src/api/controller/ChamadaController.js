const service = require('../service/ChamadaService');
const { sequelize } = require('../models/index');

class ChamadaController {

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
            const { chamada } = req.body;
            const chamadaModel = await service.create(chamada, transaction);
            await transaction.commit();
            return res.status(201).json(chamadaModel);
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async update(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { chamada } = req.body;
            const { id } = req.params;
            await service.update(chamada, id, transaction)
            await transaction.commit();
            return res.status(201).json();
        } catch (error) {
            await transaction.rollback();
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            return res.status(204).json(await service.deleteById(id));
        } catch (error) {
            next(error);
        }
    }


}

module.exports = ChamadaController;