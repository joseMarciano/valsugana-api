
class Repository {

    static async findAll(model, options = {}) {
        options = parseOptions(options);
        return await model.findAll(options);
    }
    static async findById(model, idModel) {
        return await model.findByPk(idModel);
    }

    static async save(model, values, options = {}) {
        return await model.create(values, options);
    }

    static async update(model, values, options = {}) {
        return await model.update(values, options);
    }

    static async pagination(model, options = {}) {
        options = parseOptions(options);
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

function parseOptions(options = {}) {
    if (typeof options === 'string' && options.length > 0)
        options = JSON.parse(options);

    if (typeof options === 'string' && options.length === 0)
        options = {};

    return options;
}

module.exports = Repository;