const { sequelize } = require("../sequelize")
const BoardBaseRepository = require("./BoardBaseRepository")

module.exports = class BoardPostgreRepository extends BoardBaseRepository {
  async getAll() {
    const rows = await sequelize.model("Board").findAll({ include: "location", order: [["id", "ASC"]] })
    return rows
  }

  async getByLocationId(locationId) {
    const row = await sequelize.model("Board").findOne({ where: { locationId }, include: "location" })
    return row
  }

  async store(board) {
    const row = await sequelize.model("Board").create(board)
    return row
  }

  async addTicketRequest(ticketRequest) {
    // Extract attributes for closure
    const { quantity, date, subscriberId, boardId } = ticketRequest
    // Start transaction
    const result = await sequelize.transaction(async function (t) {
      // Get board if exists
      const board = await sequelize.model("Board").findByPk(boardId, { transaction: t })
      if (board === null) {
        throw new Error("Board not found.")
      }
      // Get subscriber if exists
      const subscriber = await sequelize.model("Subscriber").findByPk(subscriberId, { transaction: t })
      if (subscriber === null) {
        throw new Error("Subscriber not found.")
      }
      // Persist request
      const ticketRequest = await sequelize.model("TicketRequest").create({
        quantity: quantity,
        date: date,
        subscriberId: subscriberId,
        boardId: boardId
      }, { transaction: t })
      // Subtract request tickets from board and persist it
      board.tickets -= ticketRequest.quantity
      await board.save({ transaction: t })
      // Commit
      return ticketRequest
    })
    return result
  }
}