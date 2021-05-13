'use strict';
const { Model } = require('sequelize');
const ValidationException = require('../handler/ValidationException');
const differenceInCalendarDays = require('date-fns/differenceInCalendarDays');
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  class PessoaFisica extends Model {

    get isNew() {
      return !this.id;
    }

    static associate(models) {
      this.belongsTo(models.PessoaFisica, {
        as: 'responsavelPessoaFisica',
        foreignKey: 'responsavelId'
      });
    }
  };
  PessoaFisica.init({
    responsavelId: {
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
    validate: {
      notNullValues() { Specification.notNullValues(this) },
      async hasUniqueCPF() { await Specification.hasUniqueCPF(this) },
      menorHasResponsavel() { Specification.menorHasResponsavel(this) },
      async responsavelIsMaiorIdade() { await Specification.responsavelIsMaiorIdade(this) },
    },
    modelName: 'PessoaFisica',
    tableName: 'PESSOAS_FISICAS'
  });
  return PessoaFisica;
};
/* -------------------------------------------------------------------------------- */

const { Op } = require('sequelize');
const notNullValues = new Map([
  ['nome', 'É obrigatório informar o campo nome.'],
  ['cpf', 'É obrigatório informar o campo cpf.'],
  ['dataNascimento', 'É obrigatório informar o campo data de nascimento.'],
]);
class Specification {

  static async _getService() {
    return await require('../service/PessoaFisicaService');
  }

  static notNullValues(entity) {
    for (const [key, value] of notNullValues) {
      if (!entity[key]) throw new ValidationException(value);
    }
  }

  static async hasUniqueCPF(entity) {
    if (!entity.cpf) return;

    let filter = { where: { cpf: entity.cpf } };

    if (!entity.isNew) filter.where.id = { [Op.ne]: entity.id }
    const service = await this._getService();
    const list = await service.list({ ...filter, raw: true });
    if (!_.isEmpty(list)) throw new ValidationException(`Já existe uma pessoa com o CPF informado.`)

  }

  static menorHasResponsavel(entity) {
    if (!entity.dataNascimento) return;

    const diffDays =
      differenceInCalendarDays(new Date(), new Date(entity.dataNascimento));

    if ((diffDays / 365) < 18 && !entity.responsavelId)
      throw new ValidationException('Para pessoa física menor de 18 anos, é obrigatório informar um responsável');

  }
  static async responsavelIsMaiorIdade(entity) {
    if (!entity.responsavelId) return;
    const service = await this._getService();

    const responsavel = await service.findById(entity.responsavelId);

    const diffYears =
      differenceInCalendarDays(new Date(), new Date(responsavel.dataNascimento));


    if ((diffYears / 365) < 18)
      throw new ValidationException('O responsável deve ser maior de idade.');

  }

}