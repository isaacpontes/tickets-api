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

  const Reposition = sequelize.define("Reposition", attributes)

  Reposition.associate = function (models) {
    Reposition.belongsTo(models.Inventory, { as: "inventory" })
  }

  return Reposition
}