module.exports = class WithdrawalBaseRepository {
  async findById(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async getInventory({ inventoryId }) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async getBoard({ boardId }) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async saveWithdrawal(withdrawal, inventory, board) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async delete(withdrawalId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }
}