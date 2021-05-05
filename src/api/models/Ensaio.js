'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ensaio extends Model {

        static associate(models) {
            //ensaio hasMany chamada
        }
    };

    Ensaio.init({
        descricao: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Ensaio',
        tableName: 'ENSAIOS'
    });
    return Ensaio;
};