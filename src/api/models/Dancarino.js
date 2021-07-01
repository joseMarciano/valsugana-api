'use strict';
const _ = require('lodash');
const ValidationException = require('../handler/ValidationException');
const { Model } = require('sequelize');
const PessoaFisica = require('./PessoaFisica');

module.exports = (sequelize, DataTypes) => {
    class Dancarino extends Model {

        get isNew() {
            return !this.id;
        }

        static associate(models) {
            this.belongsTo(models.PessoaFisica, {
                as: 'pessoaFisicaDancarino',
                foreignKey: 'pessoaFisicaId'
            });

            this.belongsToMany(models.Ensaio, {
                through: {
                    model: models.EnsaioDancarino
                },
                foreignKey: 'dancarinoId',
                as: 'ensaiosDancarino'
            });
        }
    };

    Dancarino.init({
        pessoaFisicaId: {
            type: DataTypes.BIGINT,
            references: {
                model: PessoaFisica(sequelize, DataTypes)
            }
        },
        vigencia: DataTypes.DATE,
        descricao: DataTypes.STRING,
        desabilitado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'fl_desabilitado'
        }
    }, {
        sequelize,
        validate: {
            notNullValues() { Specification.notNullValues(this) },
            async existsPessoaFisica() { await Specification.existsPessoaFisica(this) },
            async hasUniquePessoaFisica() { await Specification.hasUniquePessoaFisica(this) }
        },
        modelName: 'Dancarino',
        tableName: 'DANCARINOS'
    });
    return Dancarino;
};


const { Op } = require('sequelize');
const notNullValues = new Map([
    ['pessoaFisicaId', 'É obrigatório informar uma pessoa física.'],
    ['vigencia', 'É obrigatório informar a vigência.'],
    ['descricao', 'É obrigatório informar uma descrição'],
]);
class Specification {

    static async _getService(Service) {
        return await require(`../service/${Service}`);
    }

    static notNullValues(entity) {
        for (const [key, value] of notNullValues) {
            if (!entity[key]) throw new ValidationException(value);
        }
    }

    static async existsPessoaFisica(entity) {
        if (!entity.pessoaFisicaId) return;

        const service = await this._getService('PessoaFisicaService');
        await service.findById(entity.pessoaFisicaId);

    }

    static async hasUniquePessoaFisica(entity) {
        if (!entity.pessoaFisicaId) return;
        let filter = { where: { pessoaFisicaId: entity.pessoaFisicaId } };

        if (!entity.isNew) filter.where.id = { [Op.ne]: entity.id }

        const service = await this._getService('DancarinoService');
        const list = await service.list({options:{ ...filter, raw: true }});
        if (!_.isEmpty(list)) throw new ValidationException(`Já existe um dançarino com a pessoa física informada.`);
    }
}