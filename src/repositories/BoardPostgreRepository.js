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

  async getRequestsByMonth(month, year) {
    const [ticketRequests] = await sequelize.query(`
      SELECT
        tr.id, tr.quantity, tr.date, tr.subscriber_id AS "subscriberId", tr.board_id AS "boardId"
      FROM ticket_requests AS tr
      WHERE EXTRACT(MONTH FROM tr.date) = ? AND EXTRACT(YEAR FROM tr.date) = ?
      ORDER BY tr.date DESC;
    `, {
      replacements: [month, year]
    })
    return ticketRequests
  }

  async getRequestsTicketsTotal(startDate, endDate) {
    const formatedStartDate = startDate.toISOString()
    const formatedEndDate = endDate.toISOString()
    const [result] = await sequelize.query(`
      SELECT boards.id AS "boardId", SUM(ticket_requests.quantity) AS "totalRequested"
      FROM boards LEFT JOIN ticket_requests ON boards.id = ticket_requests.board_id
      WHERE ticket_requests.date >= ? AND ticket_requests.date < ?
      GROUP BY boards.id;
    `, {
      replacements: [formatedStartDate, formatedEndDate]
    })
    return result
  }
}