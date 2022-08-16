'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("subscribers", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false
      },
      document: {
        type: Sequelize.STRING,
      },
      is_updated: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("subscribers")
  }
};
