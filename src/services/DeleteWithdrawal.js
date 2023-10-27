module.exports = class DeleteWithdrawal {
  #withdrawalRepository

  constructor(withdrawalRepository) {
    this.#withdrawalRepository = withdrawalRepository
  }

  /** @TODO Refatorar e incluir regras */
  async execute(withdrawalId) {
    await this.#withdrawalRepository.delete(withdrawalId)
  }
}