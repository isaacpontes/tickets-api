module.exports = function (sequelize, DataTypes) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }

  const Location = sequelize.define("Location", attributes)

  Location.associate = function (models) {
    Location.hasOne(models.Inventory, { as: "inventory", foreignKey: "id" })
    Location.hasMany(models.Subscriber, { as: "subscribers" })
    Location.hasOne(models.Board, { as: "board", foreignKey: "id" })
  }

  return Location
}