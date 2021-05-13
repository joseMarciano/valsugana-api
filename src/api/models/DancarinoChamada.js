'use strict';
const { Model } = require('sequelize');
const ValidationException = require('../handler/ValidationException');

module.exports = (sequelize, DataTypes) => {
    class DancarinoChamada extends Model {

        static associate(models) {
        }
    };

    DancarinoChamada.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        observacao: DataTypes.STRING,
        presente: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'fl_presente'
        }
    }, {
        sequelize,
        validate: {
            notNullValues() { Specification.notNullValues(this) },
            async existsEnsaioDancarino() { await Specification.existsEnsaioDancarino(this) },
            async existsChamada() { await Specification.existsChamada(this) },
        },
        modelName: 'DancarinoChamada',
        tableName: 'DANCARINOS_CHAMADAS',
        timestamps: false
    });
    return DancarinoChamada;
};


const notNullValues = new Map([
    ['ensaioDancarinoId', 'É obrigatório informar o dancarino.'],
    ['chamadaId', 'É obrigatório informar a chamada.'],
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

    static async existsEnsaioDancarino(entity) {
        const ensaioDancarinoService = await this._getService('EnsaioDancarinoService');
        if (!entity.ensaioDancarinoId) return;

        try {
            await ensaioDancarinoService.findById(entity.ensaioDancarinoId);
        } catch (error) {
            throw new ValidationException('O dançarino informado na chamada deve estar vinculado ao ensaio.');
        }

    }

    static async existsChamada(entity) {
        // TODO FAZER VALIDAÇÃO PARA VER SE A CHAMADA QUE ESTÁ SENDO PASSADA REALEMNTE EXISTE
    }
}