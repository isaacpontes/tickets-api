const { sequelize } = require("../sequelize")
const LocationBaseRepository = require("./LocationBaseRepository")

module.exports = class LocationPostgreRepository extends LocationBaseRepository {
  async getAll() {
    const locations = await sequelize.model("Location").findAll()
    return locations
  }

  async store(location) {
    const row = await sequelize.model("Location").create(location)
    return row
  }
}