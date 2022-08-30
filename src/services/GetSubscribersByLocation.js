const Subscriber = require("../entities/Subscriber")

module.exports = class GetSubscribersByLocation {
  #subscriberRepository

  constructor(subscriberRepository) {
    this.#subscriberRepository = subscriberRepository
  }

  async execute(locationId) {
    const rows = await this.#subscriberRepository.getByLocation(locationId)
    const subscribers = rows.map(row => new Subscriber(row))
    return subscribers
  }
}