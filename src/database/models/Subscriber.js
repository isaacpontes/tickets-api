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
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    document: {
      type: DataTypes.STRING,
    },
    isUpdated: {
      type: DataTypes.BOOLEAN,
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

  const Subscriber = sequelize.define("Subscriber", attributes)

  Subscriber.associate = function (models) {
    Subscriber.belongsTo(models.Location)
    Subscriber.hasMany(models.TicketRequest)
  }

  return Subscriber
}