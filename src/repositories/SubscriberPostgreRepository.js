const { sequelize } = require("../sequelize")
const SubscriberBaseRepository = require("./SubscriberBaseRepository")

module.exports = class SubscriberPostgreRepository extends SubscriberBaseRepository {
  async getAll() {
    const row = await sequelize.model("Subscriber").findAll({ include: "location", order: [["name", "ASC"]] })
    return row
  }

  async store(subscriber) {
    const row = await sequelize.model("Subscriber").create(subscriber)
    return row
  }
}