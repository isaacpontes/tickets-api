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
    first_ticket: {
      type: DataTypes.STRING,
    },
    last_ticket: {
      type: DataTypes.STRING
    },
    observations: {
      type: DataTypes.STRING
    },
    inventoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "inventories",
        key: "id"
      },
      onDelete: "RESTRICT"
    },
  }

  const Withdrawal = sequelize.define("Withdrawal", attributes)

  Withdrawal.associate = function (models) {
    Withdrawal.belongsTo(models.Inventory)
  }

  return Withdrawal
}