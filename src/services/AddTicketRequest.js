const TicketRequest = require("../entities/TicketRequest")

module.exports = class AddTicketRequest {
  constructor(boardRepository, subscriberRepository) {
    this.boardRepository = boardRepository
    this.subscriberRepository = subscriberRepository
  }

  async execute(input) {
    const ticketRequest = new TicketRequest(input)
    const board = await this.boardRepository.getById(ticketRequest.boardId)
    const subscriber = await this.subscriberRepository.getById(ticketRequest.subscriberId)
    if (board.locationId !== subscriber.locationId) {
      throw new Error("Local da mesa não pode ser diferente do local do usuário.")
    }
    const persistedTicketRequest = await this.boardRepository.addTicketRequest(ticketRequest)
    ticketRequest.id = persistedTicketRequest.id
    return ticketRequest
  }
}