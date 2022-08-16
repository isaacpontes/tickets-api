'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("inventories", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tickets: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "locations",
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
    await queryInterface.dropTable("inventories")
  }
};
