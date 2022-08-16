const Board = require("./Board")
const Subscriber = require("./Subscriber")

module.exports = class TicketRequest {
  constructor({ id, quantity, date, subscriberId, subscriber, boardId, board }) {
    this.id = id
    this.quantity = quantity
    this.date = date ? new Date(date) : new Date()
    this.subscriberId = subscriberId
    this.subscriber = subscriber ? new Subscriber(subscriber) : null
    this.boardId = boardId
    this.board = board ? new Board(board) : null
  }
}