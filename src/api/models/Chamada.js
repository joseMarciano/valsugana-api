'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Chamada extends Model {

        static associate(models) {
            this.belongsToMany(models.Dancarino, {
                through: {
                    model: models.DancarinoChamada
                },
                as: 'chamadasDancarinos',
                foreignKey: 'chamadaId'
            });
        }
    };

    Chamada.init({
        vigencia: DataTypes.DATE,
        descricao: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Chamada',
        tableName: 'CHAMADAS'
    });
    return Chamada;
};