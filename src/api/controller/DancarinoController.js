const service = require('../service/DancarinoService');

class DancarinoController {
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
        try {
            const { dancarino } = req.body;
            return res.status(201).json(await service.save(dancarino));
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { dancarino } = req.body;
            const { id } = req.params;
            return res.status(201).json(await service.update(dancarino, id));
        } catch (error) {
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


module.exports = DancarinoController;