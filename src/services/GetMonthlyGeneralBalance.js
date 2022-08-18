const Board = require("../entities/Board")
const Inventory = require("../entities/Inventory")

module.exports = class GetMonthlyGeneralBalance {
  #inventoryRepository
  #boardRepository

  constructor(inventoryRepository, boardRepository) {
    this.#inventoryRepository = inventoryRepository
    this.#boardRepository = boardRepository
  }

  async execute(month, year) {
    const startDate = new Date(year, month - 1, 1, -3)
    const now = new Date()
    // Get all persisted inventories
    const persistedInventories = await this.#inventoryRepository.getAll()
    // Get all tickets added and whitdrawn from the specified month onward
    const totalTicketsAdded = await this.#inventoryRepository.getRepositionsTicketsTotal(startDate, now)
    const totalTicketsWithdrawn = await this.#inventoryRepository.getWithdrawalsTicketsTotal(startDate, now)
    // Get all persisted repositions and withdrawals from the specified month
    const persistedMonthRepositions = await this.#inventoryRepository.getRepositionsByMonth(month, year)
    const persistedMonthWithdrawals = await this.#inventoryRepository.getWithdrawalsByMonth(month, year)
    // Group all information from each inventory inside an array of inventories
    const inventories = persistedInventories.map((persistedInventory) => {
      const inventory = new Inventory(persistedInventory)
      // Subtract all added tickets and sum back all whitdrawn tickets from the period to get the previous total
      let previousTickets = this.#calculatePreviousInventoryTickets(inventory, totalTicketsAdded, totalTicketsWithdrawn)
      // Add the month repositions and withdrawals to their respective inventory
      this.#filterAndAddInventoryRepositions(inventory, persistedMonthRepositions)
      this.#filterAndAddInventoryWithdrawals(inventory, persistedMonthWithdrawals)
      // Sum all month repositions and subtract all month withdrawals to get the balance at the end of month
      const ticketsAdded = inventory.repositions.reduce((sum, reposition) => sum + reposition.quantity, 0)
      const ticketsWithdrawn = inventory.withdrawals.reduce((sum, withdrawal) => sum + withdrawal.quantity, 0)
      const finalTickets = previousTickets + ticketsAdded - ticketsWithdrawn
      return { inventory, previousTickets, ticketsAdded, ticketsWithdrawn, finalTickets }
    })
    // Get all persisted boards
    const persistedBoards = await this.#boardRepository.getAll()
    // Get all tickets requested from the specified month onward
    const totalTicketsRequested = await this.#boardRepository.getRequestsTicketsTotal(startDate, now)
    // Get all persisted ticket requests from the specified month
    const persistedMonthRequests = await this.#boardRepository.getRequestsByMonth(month, year)
    // Group information from each board inside an array of boards
    const boards = persistedBoards.map((persistedBoard) => {
      const board = new Board(persistedBoard)
      // Subtract all withdrawn tickets and sum back all requested tickets from period to get the previous total
      let previousTickets = this.#calculatePreviousBoardBalance(board, totalTicketsWithdrawn, totalTicketsRequested)
      // Add the month requests to their respective boards
      this.#filterAndAddBoardRequests(board, persistedMonthRequests)
      // Sum all month withdrawals and subtract all month requests to get the balance at the end of month
      const { inventory: inventoryFromSameLocation } = inventories.find(({ inventory }) => inventory.locationId === board.locationId)
      const ticketsWithdrawn = inventoryFromSameLocation.withdrawals.reduce((sum, withdrawal) => sum + withdrawal.quantity, 0)
      const ticketsRequested = board.ticketRequests.reduce((sum, request) => sum + request.quantity, 0)
      const finalTickets = previousTickets + ticketsWithdrawn - ticketsRequested
      return { board, previousTickets, ticketsWithdrawn, ticketsRequested, finalTickets }
    })
    return { inventories, boards }
  }

  #calculatePreviousInventoryTickets(inventory, added, removed) {
    let previousTickets = inventory.tickets
    added.forEach(function (item) {
      if (inventory.id === item.inventoryId) {
        previousTickets -= parseInt(item.totalAdded)
      }
    })
    removed.forEach(function (item) {
      if (inventory.id === item.inventoryId) {
        previousTickets += parseInt(item.totalWithdrawn)
      }
    })
    return previousTickets
  }

  #calculatePreviousBoardBalance(board, added, removed) {
    let previousTickets = board.tickets
    added.forEach(function (item) {
      if (board.locationId === item.locationId) {
        previousTickets -= parseInt(item.totalWithdrawn)
      }
    })
    removed.forEach(function (item) {
      if (board.id === item.boardId) {
        previousTickets += parseInt(item.totalRequested)
      }
    })
    return previousTickets
  }

  #filterAndAddInventoryRepositions(inventory, repositions) {
    repositions.forEach(function (reposition) {
      if (reposition.inventoryId === inventory.id) {
        inventory.addReposition(reposition)
      }
    })
  }

  #filterAndAddInventoryWithdrawals(inventory, withdrawals) {
    withdrawals.forEach(function (withdrawal) {
      if (withdrawal.inventoryId === inventory.id) {
        inventory.addWithdrawal(withdrawal)
      }
    })
  }

  #filterAndAddBoardRequests(board, requests) {
    requests.forEach(function (request) {
      if (request.boardId === board.id) {
        board.addTicketRequest(request)
      }
    })
  }
}