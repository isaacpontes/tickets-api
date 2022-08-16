'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("withdrawals", {
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
      first_ticket: {
        type: Sequelize.STRING,
      },
      last_ticket: {
        type: Sequelize.STRING
      },
      observations: {
        type: Sequelize.STRING
      },
      inventory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "inventories",
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
    await queryInterface.dropTable("withdrawals")
  }
};
