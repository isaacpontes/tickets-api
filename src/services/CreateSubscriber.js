const Subscriber = require("../entities/Subscriber")

module.exports = class CreateSubscriber {
  constructor(subscriberRepository) {
    this.subscriberRepository = subscriberRepository
  }

  async execute(input) {
    const subscriber = new Subscriber(input)
    const persistedSubscriber = await this.subscriberRepository.store(subscriber)
    subscriber.id = persistedSubscriber.id
    return subscriber
  }
}