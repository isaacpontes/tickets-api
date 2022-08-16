const Withdrawal = require("../entities/Withdrawal")

module.exports = class AddWithdrawal {
  constructor(inventoryReposition) {
    this.inventoryReposition = inventoryReposition
  }

  async execute(input) {
    const withdrawal = new Withdrawal(input)
    const persistedWithdrawal = await this.inventoryReposition.withdrawTickets(withdrawal)
    withdrawal.id = persistedWithdrawal.id
    return withdrawal
  }
}