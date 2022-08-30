module.exports = class DeleteSubscriber {
  #subscriberRepository

  constructor(subscriberRepository) {
    this.#subscriberRepository = subscriberRepository
  }

  async execute(subscriberId) {
    await this.#subscriberRepository.delete(subscriberId)
  }
}