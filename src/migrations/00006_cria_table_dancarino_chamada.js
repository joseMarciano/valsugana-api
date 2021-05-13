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
      ensaioDancarinoId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'ENSAIOS_DANCARINOS',
          key: 'id'
        }
      },
      chamadaId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'CHAMADAS',
          key: 'id'
        },
        onDelete: 'cascade'
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