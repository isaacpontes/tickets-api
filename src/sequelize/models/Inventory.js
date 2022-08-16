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
    }
  }

  const Inventory = sequelize.define("Inventory", attributes)

  Inventory.associate = function (models) {
    Inventory.belongsTo(models.Location, { as: "location" })
    Inventory.hasMany(models.Withdrawal, { as: "withdrawals" })
    Inventory.hasMany(models.Reposition, { as: "repositions" })
  }

  return Inventory
}