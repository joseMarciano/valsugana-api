'use strict';
const { Model } = require('sequelize');
const PessoaFisica = require('./PessoaFisica');

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
        modelName: 'DancarinoChamada',
        tableName: 'DANCARINOS_CHAMADAS',
        timestamps: false
    });
    return DancarinoChamada;
};