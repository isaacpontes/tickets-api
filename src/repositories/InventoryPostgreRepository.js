const Board = require("../entities/Board")
const Inventory = require("../entities/Inventory")
const { sequelize } = require("../sequelize")
const InventoryBaseRepository = require("./InventoryBaseRepository")

module.exports = class InventoryPostgreRepository extends InventoryBaseRepository {
  async getAll() {
    const rows = await sequelize.model("Inventory").findAll({
      attributes: ["id", "tickets"],
      include: { association: "location", attributes: ["id", "name"] },
      order: [["id", "ASC"]]
    })
    return rows
  }

  async getById(id) {
    const row = await sequelize.model("Inventory").findByPk(id, {
      include: ["location", "withdrawals", "repositions"]
    })
    return row ? new Inventory(row.get()) : null
  }

  async getByLocationId(locationId) {
    const row = await sequelize.model("Inventory").findOne({ where: { locationId }, include: "location" })
    return row ? new Inventory(row.get()) : null
  }

  async getBoardFromSameLocation(inventoryId) {
    const inventory = await sequelize.model("Inventory").findByPk(inventoryId)
    const row = await sequelize.model("Board").findOne({
      where: { locationId: inventory.locationId },
      include: "location"
    })
    return row ? new Board(row.get()) : null
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

  async getRepositionsByMonth(month, year) {
    const [repositions] = await sequelize.query(`
      SELECT
        r.id, r.quantity, r.date, r.observations, r.inventory_id AS "inventoryId"
      FROM repositions AS r
      WHERE EXTRACT(MONTH FROM r.date) = ? AND EXTRACT(YEAR FROM r.date) = ?
      ORDER BY r.date DESC;
    `, {
      replacements: [month, year]
    })
    return repositions
  }

  async getWithdrawalsByMonth(month, year) {
    const [withdrawals] = await sequelize.query(`
      SELECT
        w.id, w.quantity, w.date, w.first_ticket AS "firstTicket", w.last_ticket AS "lastTicket", w.observations, w.inventory_id AS "inventoryId"
      FROM withdrawals AS w
      WHERE EXTRACT(MONTH FROM w.date) = ? AND EXTRACT(YEAR FROM w.date) = ?
      ORDER BY w.date DESC;
    `, {
      replacements: [month, year]
    })
    return withdrawals
  }

  async getRepositionsTicketsTotal(startDate, endDate) {
    const formatedStartDate = startDate.toISOString()
    const formatedEndDate = endDate.toISOString()
    const [result] = await sequelize.query(`
      SELECT inventories.id AS "inventoryId", SUM(repositions.quantity) AS "totalAdded"
      FROM inventories LEFT JOIN repositions ON inventories.id = repositions.inventory_id
      WHERE repositions.date >= ? AND repositions.date < ?
      GROUP BY inventories.id;
    `, {
      replacements: [formatedStartDate, formatedEndDate]
    })
    return result
  }

  async getWithdrawalsTicketsTotal(startDate, endDate) {
    const formatedStartDate = startDate.toISOString()
    const formatedEndDate = endDate.toISOString()
    const [result] = await sequelize.query(`
      SELECT inventories.id AS "inventoryId", inventories.location_id AS "locationId", SUM(withdrawals.quantity) AS "totalWithdrawn"
      FROM inventories LEFT JOIN withdrawals ON inventories.id = withdrawals.inventory_id
      WHERE withdrawals.date >= ? AND withdrawals.date < ?
      GROUP BY inventories.id;
    `, {
      replacements: [formatedStartDate, formatedEndDate]
    })
    return result
  }
}