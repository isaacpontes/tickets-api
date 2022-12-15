const Subscriber = require("../entities/Subscriber")

module.exports = class GetSubscribers {
  constructor(subscriberRepository) {
    this.subscriberRepository = subscriberRepository
  }

  async execute(page = 1, limit = 20) {
    const rows = await this.subscriberRepository.getAll(page, limit)
    const total = await this.subscriberRepository.countAll()
    const subscribers = rows.map(row => new Subscriber(row))
    return {
      subscribers,
      page,
      limit,
      total
    }
  }
}