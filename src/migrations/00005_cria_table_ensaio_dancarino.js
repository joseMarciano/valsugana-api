'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ENSAIOS_DANCARINOS', {
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
      ensaioId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'ENSAIOS',
          key: 'id',
        },
        onDelete: 'cascade'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ENSAIOS_DANCARINOS');
  }
};