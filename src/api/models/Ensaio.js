'use strict';
const { Model } = require('sequelize');
const ValidationException = require('../handler/ValidationException');

module.exports = (sequelize, DataTypes) => {
    class Ensaio extends Model {

        static associate(models) {
            this.hasMany(models.Chamada, {
                foreignKey: 'ensaioId',
                as: 'chamadasEnsaio'
            });

            this.belongsToMany(models.Dancarino, {
                through: {
                    model: models.EnsaioDancarino
                },
                foreignKey: 'ensaioId',
                as: 'dancarinosEnsaio'
            });
        }
    };

    Ensaio.init({
        descricao: DataTypes.STRING
    }, {
        sequelize,
        validate: {
            notNullValues() { Specification.notNullValues(this) }
        },
        modelName: 'Ensaio',
        tableName: 'ENSAIOS'
    });
    return Ensaio;
};

const notNullValues = new Map([
    ['descricao', 'É obrigatório informar o campo descrição.']
]);
class Specification {

    static async _getService() {
        return await require('../service/EnsaioService');
    }

    static notNullValues(entity) {
        for (const [key, value] of notNullValues) {
            if (!entity[key]) throw new ValidationException(value);
        }
    }
}