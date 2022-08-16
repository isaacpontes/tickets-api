const Board = require("../entities/Board")

module.exports = class GetBoards {
  constructor(boardRepository) {
    this.boardRepository = boardRepository
  }

  async execute() {
    const rows = await this.boardRepository.getAll()
    const boards = rows.map(row => new Board(row))
    return boards
  }
}