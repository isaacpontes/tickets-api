const Subscriber = require("../entities/Subscriber")

module.exports = class SearchSubscribers {
  #subscriberRepository

  constructor(subscriberRepository) {
    this.#subscriberRepository = subscriberRepository
  }

  async execute({ name, locationId }, page = 1, limit = 20) {
    const { count, rows } = await this.#subscriberRepository.search({ name, locationId }, page, limit)
    const subscribers = rows.map(row => new Subscriber(row))
    return {
      subscribers,
      page,
      limit,
      total: count
    }
  }
}