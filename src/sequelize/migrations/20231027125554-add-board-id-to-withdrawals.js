'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("withdrawals", "board_id", Sequelize.INTEGER, {
      allowNull: false,
      references: {
        model: "boards",
        key: "id"
      },
      onDelete: "RESTRICT"
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("withdrawals", "board_id")
  }
};
