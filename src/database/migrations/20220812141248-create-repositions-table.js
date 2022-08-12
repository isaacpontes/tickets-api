'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("repositions", {
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
      observations: {
        type: Sequelize.STRING
      },
      inventoryId: {
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
    await queryInterface.dropTable("repositions")
  }
};
