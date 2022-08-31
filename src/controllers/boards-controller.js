const BoardPostgreRepository = require("../repositories/BoardPostgreRepository")
const SubscriberPostgreRepository = require("../repositories/SubscriberPostgreRepository")
const AddTicketRequest = require("../services/AddTicketRequest")
const CreateBoard = require("../services/CreateBoard")
const GetBoards = require("../services/GetBoards")

module.exports = {
  async index(req, res) {
    try {
      const boardPostgreRepository = new BoardPostgreRepository()
      const getBoards = new GetBoards(boardPostgreRepository)
      const boards = await getBoards.execute()
      return res.json(boards)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async store(req, res) {
    try {
      const boardPostgreRepository = new BoardPostgreRepository()
      const createBoard = new CreateBoard(boardPostgreRepository)
      const board = await createBoard.execute(req.body.locationId)
      return res.status(201).json(board)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async addRequest(req, res) {
    try {
      const { id: boardId } = req.params
      const { quantity, date, subscriberId } = req.body
      const boardPostgreRepository = new BoardPostgreRepository()
      const subscriberPostgreRepository = new SubscriberPostgreRepository()
      const addTicketRequest = new AddTicketRequest(boardPostgreRepository, subscriberPostgreRepository)
      const ticketRequest = await addTicketRequest.execute({ quantity, date, boardId, subscriberId })
      return res.status(201).json(ticketRequest)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}