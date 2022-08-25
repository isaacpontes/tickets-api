const Subscriber = require("../entities/Subscriber")

module.exports = class UpdateSubscriber {
  #subscriberRepository

  constructor(subscriberRepository) {
    this.#subscriberRepository = subscriberRepository
  }

  async execute(subscriberId, values) {
    const subscriber = new Subscriber({...values, id: subscriberId})
    await this.#subscriberRepository.update(subscriber)
  }
}