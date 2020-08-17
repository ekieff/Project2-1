'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      accountId: {
        type: Sequelize.INTEGER
      },
      summonerId: {
        type: Sequelize.INTEGER
      },
      region: {
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      games: {
        type: Sequelize.INTEGER
      },
      winRate: {
        type: Sequelize.INTEGER
      },
      kda: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('players');
  }
};