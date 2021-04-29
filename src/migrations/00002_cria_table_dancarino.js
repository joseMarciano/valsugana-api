'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DANCARINOS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      pessoaFisicaId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'PESSOAS_FISICAS',
          key: 'id'
        }
      },
      fl_desabilitado: {
        type: Sequelize.BOOLEAN
      },
      descricao: {
        type: Sequelize.STRING
      },
      vigencia: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DANCARINOS');
  }
};