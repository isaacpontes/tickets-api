module.exports = class BoardBaseRepository {
  async getAll() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async getByLocationId(locationId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async store(board) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async addTicketRequest(ticketRequest) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async getRequestsByMonth(month, year) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async getRequestsTicketsTotal(startDate, endDate) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }
}