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
    Location.hasMany(models.Inventory)
    Location.hasMany(models.Subscriber)
    Location.hasMany(models.Board)
  }

  return Location
}