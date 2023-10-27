const Board = require("../entities/Board")
const Inventory = require("../entities/Inventory")
const Withdrawal = require("../entities/Withdrawal")
const { sequelize } = require("../sequelize")
const WithdrawalBaseRepository = require("./WithdrawalBaseRepository")

module.exports = class WithdrawalPostgreRepository extends WithdrawalBaseRepository {
  async findById(id) {
    // Get stored withdrawal
    const row = await sequelize.model("Withdrawal").findByPk(id)
    return row ? new Withdrawal(row.get()) : null
  }

  async getInventory({ inventoryId }) {
    const row = await sequelize.model("Inventory").findByPk(inventoryId)
    return row ? new Inventory(row.get()) : null
  }

  async getBoard({ boardId }) {
    const row = await sequelize.model("Board").findByPk(boardId)
    return row ? new Board(row.get()) : null
  }

  async saveWithdrawal(withdrawal, inventory, board) {
    return await sequelize.transaction(async function (transaction) {
      if (!withdrawal.id) {
        // Create new withdrawal
        const row = await sequelize.model("Withdrawal").create(withdrawal, { transaction })
        withdrawal.id = row.id
      } else {
        // Update existing withdrawal
        await sequelize.model("Withdrawal").update(withdrawal, { where: { id: withdrawal.id }, transaction })
      }

      // Update the tickets quantity on inventory and board
      await sequelize.model("Inventory").update(
        { tickets: inventory.tickets },
        { where: { id: inventory.id }, transaction }
      )
      await sequelize.model("Board").update(
        { tickets: board.tickets },
        { where: { id: board.id }, transaction }
      )

      // Commit
      return withdrawal
    })
  }

  /** @TODO Refatorar e simplificar */
  async delete(id) {
    const transaction = await sequelize.transaction()
    try {
      const oldWithdrawal = await sequelize.model("Withdrawal").findByPk(id, { transaction })
      if (oldWithdrawal === null) {
        throw new Error("Withdrawal not found.")
      }
      // Get inventory if exists
      const inventory = await sequelize.model("Inventory").findByPk(oldWithdrawal.inventoryId, { transaction })
      if (inventory === null) {
        throw new Error("Inventory not found.")
      }
      // Get board from same location if exists
      const board = await sequelize.model("Board").findOne({ where: { locationId: inventory.locationId }, transaction })
      if (board === null) {
        throw new Error("Board not found for this location.")
      }

      inventory.tickets += oldWithdrawal.quantity
      board.tickets -= oldWithdrawal.quantity

      await oldWithdrawal.destroy({ transaction })
      await inventory.save({ transaction })
      await board.save({ transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}