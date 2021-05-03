'use strict';
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
            allowNull: false,
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
        modelName: 'Dancarino',
        tableName: 'DANCARINOS'
    });
    return Dancarino;
};