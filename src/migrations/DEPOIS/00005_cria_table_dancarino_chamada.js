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
        onDelete: 'cascade',
        references: {
          model: 'CHAMADAS',
          key: 'id'
        }
      },
      fl_presente:{
        type: Sequelize.BOOLEAN,
      },
      observacao: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DANCARINOS_CHAMADAS');
  }
};