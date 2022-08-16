const { sequelize } = require("../sequelize")
const InventoryBaseRepository = require("./InventoryBaseRepository")

module.exports = class InventoryPostgreRepository extends InventoryBaseRepository {
  async getAll() {
    const rows = await sequelize.model("Inventory").findAll({ include: "location", order: [["id", "ASC"]] })
    return rows
  }

  async getByLocationId(locationId) {
    const row = await sequelize.model("Inventory").findOne({ where: { locationId }, include: "location" })
    return row
  }

  async store(inventory) {
    const row = await sequelize.model("Inventory").create(inventory)
    return row
  }

  async addTicketReposition(reposition) {
    // Extract attributes for closure
    const { quantity, date, observations, inventoryId } = reposition
    // Start transaction
    const result = await sequelize.transaction(async function (t) {
      // Get inventory if exists
      const inventory = await sequelize.model("Inventory").findByPk(inventoryId, { transaction: t })
      if (inventory === null) {
        throw new Error("Inventory not found.")
      }
      // Persist reposition
      const reposition = await sequelize.model("Reposition").create({
        quantity: quantity,
        date: date,
        observations: observations,
        inventoryId: inventoryId
      }, { transaction: t })
      // Add reposition tickets to inventory and persist it
      inventory.tickets += reposition.quantity
      await inventory.save({ transaction: t })
      // Commit
      return reposition
    })
    return result
  }

  async withdrawTickets(withdrawal) {
    // Extract attributes for closure
    const { quantity, date, firstTicket, lastTicket, observations, inventoryId } = withdrawal
    // Start transaction
    const result = await sequelize.transaction(async function (t) {
      // Get inventory if exists
      const inventory = await sequelize.model("Inventory").findByPk(inventoryId, { transaction: t })
      if (inventory === null) {
        throw new Error("Inventory not found.")
      }
      // Get board from same location if exists
      const board = await sequelize.model("Board").findOne({
        where: { locationId: inventory.locationId },
        transaction: t
      })
      if (board === null) {
        throw new Error("Board not found for this location.")
      }
      // Check if there are enough tickets on inventory before persisting it
      if (quantity > inventory.tickets) {
        throw new Error("Not enough tickets on inventory.")
      }
      // Persist withdrawal
      const withdrawal = await sequelize.model("Withdrawal").create({
        quantity, date, firstTicket, lastTicket, observations, inventoryId
      }, { transaction: t })
      // Update the tickets on inventory and board and persist them
      inventory.tickets -= withdrawal.quantity
      board.tickets += withdrawal.quantity
      await inventory.save({ transaction: t })
      await board.save({ transaction: t })
      // Commit
      return withdrawal
    })
    return result
  }
}