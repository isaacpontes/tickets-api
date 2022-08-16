const Board = require("../entities/Board")

module.exports = class CreateBoard {
  constructor(boardRepository) {
    this.boardRepository = boardRepository
  }

  async execute(locationId) {
    const boardExists = await this.boardRepository.getByLocationId(locationId)
    if (boardExists) {
      return new Board(boardExists)
    }
    const board = new Board({ locationId })
    const persistedBoard = await this.boardRepository.store(board)
    board.id = persistedBoard.id
    return board
  }
}