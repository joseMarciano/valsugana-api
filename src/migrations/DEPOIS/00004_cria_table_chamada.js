'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CHAMADAS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      ensaioId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'ENSAIOS',
          key: 'id'
        }
      },
      descricao: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('CHAMADAS');
  }
};