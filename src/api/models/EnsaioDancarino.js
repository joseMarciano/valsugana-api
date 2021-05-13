'use strict';
const { Model } = require('sequelize');
const ValidationException = require('../handler/ValidationException');

module.exports = (sequelize, DataTypes) => {
    class EnsaioDancarino extends Model {

        static associate(models) {
            this.belongsToMany(models.Chamada, {
                through: {
                    model: models.DancarinoChamada
                },
                foreignKey: 'ensaioDancarinoId',
                as: 'chamadasEnsaioDancarino'
            });

            this.belongsTo(models.Dancarino, {
                foreignKey: 'dancarinoId',
                as: 'dancarino'
            });
        }
    };

    EnsaioDancarino.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    }, {
        sequelize,
        validate: {
            notNullValues() { Specification.notNullValues(this) }
        },
        modelName: 'EnsaioDancarino',
        tableName: 'ENSAIOS_DANCARINOS',
        timestamps: false
    });
    return EnsaioDancarino;
};


const notNullValues = new Map([
    ['dancarinoId', 'É obrigatório informar o dançarino.'],
    ['ensaioId', 'É obrigatório informar o ensaio.']
]);
class Specification {

    static async _getService() {
        return null;
    }

    static notNullValues(entity) {
        for (const [key, value] of notNullValues) {
            if (!entity[key]) throw new ValidationException(value);
        }
    }
}