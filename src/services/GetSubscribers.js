const Subscriber = require("../entities/Subscriber")

module.exports = class GetSubscribers {
  constructor(subscriberRepository) {
    this.subscriberRepository = subscriberRepository
  }

  async execute() {
    const rows = await this.subscriberRepository.getAll()
    const subscribers = rows.map(row => new Subscriber(row))
    return subscribers
  }
}