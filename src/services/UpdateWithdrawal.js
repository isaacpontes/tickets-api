const Withdrawal = require("../entities/Withdrawal")

module.exports = class UpdateWithdrawal {
  #withdrawalRepository

  constructor(withdrawalRepository) {
    this.#withdrawalRepository = withdrawalRepository
  }

  async execute(withdrawalId, { quantity, date, firstTicket, lastTicket, observations }) {
    // Get stored withdrawal
    const oldWithdrawal = await this.#withdrawalRepository.findById(withdrawalId)
    if (oldWithdrawal === null) throw new Error("Withdrawal not found.")

    const updatedWithdrawal = new Withdrawal({
      id: oldWithdrawal.id,
      quantity,
      date,
      firstTicket,
      lastTicket,
      observations,
      inventoryId: oldWithdrawal.inventoryId,
      boardId: oldWithdrawal.boardId
    })

    // Get inventory if exists
    const inventory = await this.#withdrawalRepository.getInventory(oldWithdrawal)
    if (inventory === null) throw new Error("Inventory not found.")

    // Get board from same location if exists
    const board = await this.#withdrawalRepository.getBoard(oldWithdrawal)
    if (board === null) throw new Error("Board not found for this location.")
    
    inventory.tickets = inventory.tickets + oldWithdrawal.quantity - withdrawal.quantity
    board.tickets = board.tickets - oldWithdrawal.quantity + withdrawal.quantity

    // Persist updated withdrawal, inventory and board
    await this.#withdrawalRepository.saveWithdrawal(updatedWithdrawal, inventory, board)
  }
}