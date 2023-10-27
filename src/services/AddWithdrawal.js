const Withdrawal = require("../entities/Withdrawal")

module.exports = class AddWithdrawal {
  #withdrawalRepository

  constructor(withdrawalRepository) {
    this.#withdrawalRepository = withdrawalRepository
  }

  async execute({ quantity, date, firstTicket, lastTicket, observations, inventoryId, boardId }) {
    // Get inventory if exists
    const inventory = await this.#withdrawalRepository.getInventory({ inventoryId })
    if (inventory === null) throw new Error("Inventory not found.")
    // Get board if exists
    const board = await this.#withdrawalRepository.getBoard({ boardId })
    if (board === null) throw new Error("Board not found for this location.")

    const withdrawal = new Withdrawal({
      quantity,
      date,
      firstTicket,
      lastTicket,
      observations,
      inventoryId,
      boardId: board.id
    })

    // Check if there are enough tickets on inventory before persisting it
    if (withdrawal.quantity > inventory.tickets) throw new Error("Not enough tickets on inventory.")

    // Update the tickets on inventory and board and persist them
    inventory.tickets -= withdrawal.quantity
    board.tickets += withdrawal.quantity

    // Persist withdrawal and update inventory and board
    const persistedWithdrawal = await this.#withdrawalRepository.saveWithdrawal(withdrawal, inventory, board)
    return persistedWithdrawal
  }
}