'use strict';
const { Model } = require('sequelize');
const Chamada = require('./Chamada');
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
        chamadaId: {
            type: DataTypes.BIGINT,
            references: {
                model: Chamada(sequelize, DataTypes)
            }
        },
        observacao: DataTypes.STRING,
        presente: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'fl_presente'
        }
    }, {
        sequelize,
        modelName: 'DancarinoChamada',
        tableName: 'DANCARINOS_CHAMADAS',
        timestamps: false
    });
    return DancarinoChamada;
};