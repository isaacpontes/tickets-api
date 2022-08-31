const { sequelize } = require("../sequelize")
const SubscriberBaseRepository = require("./SubscriberBaseRepository")

module.exports = class SubscriberPostgreRepository extends SubscriberBaseRepository {
  async getAll() {
    const row = await sequelize.model("Subscriber").findAll({ include: "location", order: [["name", "ASC"]] })
    return row
  }

  async getById(id) {
    const row = await sequelize.model("Subscriber").findByPk(id)
    return row
  }

  async getByLocation(locationId) {
    const rows = await sequelize.model("Subscriber").findAll({
      include: "location",
      order: [["name", "ASC"]],
      where: { locationId }
    })
    return rows
  }

  async store(subscriber) {
    const row = await sequelize.model("Subscriber").create(subscriber)
    return row
  }

  async update(subscriber) {
    await sequelize.model("Subscriber").update({
      name: subscriber.name,
      birthday: subscriber.birthday,
      document: subscriber.document,
      isUpdated: subscriber.isUpdated,
      locationId: subscriber.locationId
    }, {
      where: {
        id: subscriber.id
      }
    })
  }

  async delete(subscriberId) {
    await sequelize.model("Subscriber").destroy({ where: { id: subscriberId } })
  }
}