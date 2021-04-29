'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PessoaFisica extends Model {

    static associate(models) {
      this.belongsTo(models.PessoaFisica, {
        as: 'responsavel',
        foreignKey: 'responsavelId'
      });
    }
  };
  PessoaFisica.init({
    responsavelId:{
      type: DataTypes.BIGINT,
      references: {
        model: this,
      }
    },
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    telefone: DataTypes.STRING,
    dataNascimento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PessoaFisica',
    tableName: 'PESSOAS_FISICAS'
  });
  return PessoaFisica;
};