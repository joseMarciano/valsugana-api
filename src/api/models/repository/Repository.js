const defaultOptions = {
    attributes: {
        exclude: ['createdAt','updatedAt']
    }
}
class Repository {

    static async findAll(model, options = {}) {
        return await model.findAll(options);
    }
    static async findById(model, idModel, options = {}) {
        return await model.findByPk(idModel, options); 
    }

    static async save(model, values, options = {}) {
        return await model.create(values, options);
    }

    static async update(model, values, options = {}) {
        return await model.update(values, options);
    }

    static async pagination(model, options = {}) {
        const result = await model.findAndCountAll({ ...options, order: [['id', 'DESC']] });
        return parsePagination(result, options);
    }

    static async destroy(model, options = {}) {
        return model.destroy(options);
    }
}

function parsePagination({ count, rows }, { offset = 0, limit = 10, sort = {} }) {
    const hasNext = (count - ((offset + 1) * limit)) > 0;
    return {
        count,
        hasNext: hasNext,
        limit: limit,
        offset: offset,
        content: rows
    }
}



module.exports = Repository;