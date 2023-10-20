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

  async update(id, name) {
    await sequelize.model("Location").update({ name }, { where: { id }})
  }

  async delete(id) {
    const tr = await sequelize.transaction()
    try {
      await sequelize.model("Board").destroy({ where: { locationId: id }, transaction: tr })
      await sequelize.model("Inventory").destroy({ where: { locationId: id }, transaction: tr })
      await sequelize.model("Location").destroy({ where: { id }, transaction: tr })
      tr.commit()
    } catch (err) {
      await tr.rollback()
      return err
    }
  }
}