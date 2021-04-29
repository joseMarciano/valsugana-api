'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DANCARINOS_CHAMADAS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      dancarinoId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'DANCARINOS',
          key: 'id'
        }
      },
      chamadaId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'CHAMADAS',
          key: 'id'
        }
      },
      descricao: {
        type: Sequelize.STRING
      },
      vigencia: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DANCARINOS_CHAMADAS');
  }
};