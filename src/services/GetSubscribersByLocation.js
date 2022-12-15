const Subscriber = require("../entities/Subscriber")

module.exports = class GetSubscribersByLocation {
  #subscriberRepository

  constructor(subscriberRepository) {
    this.#subscriberRepository = subscriberRepository
  }

  async execute(locationId, page = 1, limit = 20) {
    const rows = await this.#subscriberRepository.getByLocation(locationId, page, limit)
    const total = await this.#subscriberRepository.countByLocation(locationId)
    const subscribers = rows.map(row => new Subscriber(row))
    return {
      subscribers,
      page,
      limit,
      total
    }
  }
}