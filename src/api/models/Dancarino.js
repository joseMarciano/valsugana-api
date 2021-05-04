'use strict';
const _ = require('lodash');
const ValidationException = require('../handler/ValidationException');
const { Model } = require('sequelize');
const PessoaFisica = require('./PessoaFisica');

module.exports = (sequelize, DataTypes) => {
    class Dancarino extends Model {

        static associate(models) {
            this.belongsTo(models.PessoaFisica, {
                as: 'pessoaFisica',
                foreignKey: 'pessoaFisicaId'
            });
            this.belongsToMany(models.Chamada, {
                through: {
                    model: models.DancarinoChamada
                },
                foreignKey: 'dancarinoId',
                as: 'chamadasDancarinos'
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
            async hasUniquePessoaFisica() { await Specification.hasUniquePessoaFisica(this) }
        },
        modelName: 'Dancarino',
        tableName: 'DANCARINOS'
    });
    return Dancarino;
};



const notNullValues = new Map([
    ['pessoaFisicaId', 'É obrigatório informar uma pessoa física.'],
    ['vigencia', 'É obrigatório informar a vigência.'],
    ['descricao', 'É obrigatório informar uma descrição'],
]);
class Specification {

    static async _getService() {
        return await require('../service/DancarinoService');
    }

    static notNullValues(entity) {
        for (const [key, value] of notNullValues) {
            if (!entity[key]) throw new ValidationException(value);
        }
    }

    static async hasUniquePessoaFisica(entity) {
        if (!entity.pessoaFisicaId) return;

        const service = await this._getService();
        const list =
            await service.list({ where: { pessoaFisicaId: entity.pessoaFisicaId }, raw: true });
        if (!_.isEmpty(list)) throw new ValidationException(`Já existe um dançarino com a pessoa física informada.`);
    }
}