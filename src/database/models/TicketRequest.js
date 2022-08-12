module.exports = function (sequelize, DataTypes) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    subscriberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "subscribers",
        key: "id"
      },
      onDelete: "RESTRICT"
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "boards",
        key: "id"
      },
      onDelete: "RESTRICT"
    },
  }

  const TicketRequest = sequelize.define("TicketRequest", attributes)

  TicketRequest.associate = function (models) {
    TicketRequest.belongsTo(models.Board)
    TicketRequest.belongsTo(models.Subscriber)
  }

  return TicketRequest
}