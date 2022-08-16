const TicketRequest = require("../entities/TicketRequest")

module.exports = class AddTicketRequest {
  constructor(boardRepository) {
    this.boardRepository = boardRepository
  }

  async execute(input) {
    const ticketRequest = new TicketRequest(input)
    const persistedTicketRequest = await this.boardRepository.addTicketRequest(ticketRequest)
    ticketRequest.id = persistedTicketRequest.id
    return ticketRequest
  }
}