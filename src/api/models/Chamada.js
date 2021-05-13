'use strict';
const { Model } = require('sequelize');
const ValidationException = require('../handler/ValidationException');

module.exports = (sequelize, DataTypes) => {
    class Chamada extends Model {

        static associate(models) {

            this.belongsTo(models.Ensaio, {
                foreignKey: 'ensaioId',
                as: 'ensaioChamada'
            });

            this.belongsToMany(models.EnsaioDancarino, {
                through: {
                    model: models.DancarinoChamada
                },
                as: 'ensaiosDancarinosChamada',
                foreignKey: 'chamadaId'
            });
        }
    };

    Chamada.init({
        ensaioId: {
            type: DataTypes.BIGINT,
            references: {
                model: require('./Ensaio')(sequelize, DataTypes)
            }
        },
        descricao: DataTypes.STRING,
        vigencia: DataTypes.DATE,
    }, {
        sequelize,
        validate: {
            notNullValues() { Specification.notNullValues(this) },
            existsEnsaio() { Specification.existsEnsaio(this) },
        },
        modelName: 'Chamada',
        tableName: 'CHAMADAS'
    });
    return Chamada;
};

const notNullValues = new Map([
    ['descricao', 'É obrigatório informar o campo descrição.'],
    ['vigencia', 'É obrigatório informar o campo de vigência.'],
    ['ensaioId', 'É obrigatório informar o ensaio para a chamada.']
]);
class Specification {

    static async _getService(ServiceName) {
        return await require(`../service/${ServiceName}`);
    }

    static notNullValues(entity) {
        for (const [key, value] of notNullValues) {
            if (!entity[key]) throw new ValidationException(value);
        }
    }

    static async existsEnsaio(entity) {
        if (!entity.ensaioId) return;
        const ensaioService = await this._getService('EnsaioService');
        try {
            await ensaioService.findById(entity.ensaioId);

        } catch (error) {
            throw new ValidationException('É obrigatório informar o ensaio.')
        }
    }
}