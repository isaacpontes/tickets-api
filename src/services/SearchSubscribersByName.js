const Subscriber = require("../entities/Subscriber")

module.exports = class SearchSubscribersByName {
  #subscriberRepository

  constructor(subscriberRepository) {
    this.#subscriberRepository = subscriberRepository
  }

  async execute(name, page = 1, limit = 20) {
    const { count, rows } = await this.#subscriberRepository.searchByName(name, page, limit)
    const subscribers = rows.map(row => new Subscriber(row))
    return {
      subscribers,
      page,
      limit,
      total: count
    }
  }
}