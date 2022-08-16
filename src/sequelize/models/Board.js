module.exports = function (sequelize, DataTypes) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "locations",
        key: "id"
      },
      onDelete: "RESTRICT"
    },
  }

  const Board = sequelize.define("Board", attributes)

  Board.associate = function (models) {
    Board.belongsTo(models.Location, { as: "location" })
    Board.hasMany(models.TicketRequest, { as: "ticketRequests" })
  }

  return Board
}
