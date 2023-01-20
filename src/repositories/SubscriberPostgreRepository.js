const { Op } = require("sequelize")
const { sequelize } = require("../sequelize")
const SubscriberBaseRepository = require("./SubscriberBaseRepository")

module.exports = class SubscriberPostgreRepository extends SubscriberBaseRepository {
  async getAll(page, limit) {
    const row = await sequelize.model("Subscriber").findAll({
      include: "location",
      order: [["name", "ASC"]],
      offset: (page - 1) * limit,
      limit: limit
    })
    return row
  }

  async getById(id) {
    const row = await sequelize.model("Subscriber").findByPk(id)
    return row
  }

  async getByLocation(locationId, page, limit) {
    const rows = await sequelize.model("Subscriber").findAll({
      include: "location",
      order: [["name", "ASC"]],
      where: { locationId },
      offset: (page - 1) * limit,
      limit: limit
    })
    return rows
  }

  async searchByName(name, page, limit) {
    const { count, rows } = await sequelize.model("Subscriber").findAndCountAll({
      include: "location",
      order: [["name", "ASC"]],
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      offset: (page - 1) * limit,
      limit: limit
    })
    return { count, rows }
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

  async countAll() {
    return await sequelize.model("Subscriber").count()
  }

  async countByLocation(locationId) {
    return await sequelize.model("Subscriber").count({ where: { locationId } })
  }
}