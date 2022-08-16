const Location = require("../entities/Location")
const Inventory = require("../entities/Inventory")
const Board = require("../entities/Board")

module.exports = class CreateLocation {
  constructor(locationRepository, inventoryRepository, boardRepository) {
    this.locationRepository = locationRepository
    this.inventoryRepository = inventoryRepository
    this.boardRepository = boardRepository
  }

  async execute(name) {
    // Creates a new location and stores it
    const location = new Location({ name })
    const persistedLocation = await this.locationRepository.store(location)
    location.id = persistedLocation.id
    // Creates a new inventory for that location and stores it
    const inventory = new Inventory({ location })
    const persistedInventory = await this.inventoryRepository.store(inventory)
    inventory.id = persistedInventory.id
    // Creates a new board for that location and stores it
    const board = new Board({ location })
    const persistedBoard = await this.boardRepository.store(board)
    board.id = persistedBoard.id
    return { location, inventory, board }
  }
}