'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("ticket_requests", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      subscriberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "subscribers",
          key: "id"
        },
        onDelete: "RESTRICT"
      },
      boardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "boards",
          key: "id"
        },
        onDelete: "RESTRICT"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("ticket_requests")
  }
};
