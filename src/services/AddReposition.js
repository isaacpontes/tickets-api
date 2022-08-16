const Reposition = require("../entities/Reposition")

module.exports = class AddReposition {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository
  }

  async execute({ quantity, date, observations, inventoryId }) {
    const reposition = new Reposition({ quantity, date, observations, inventoryId })
    const persistedReposition = await this.inventoryRepository.addTicketReposition(reposition)
    reposition.id = persistedReposition.id
    return reposition
  }
}