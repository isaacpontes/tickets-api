module.exports = class Withdrawal {
  constructor({ id, quantity, date, firstTicket, lastTicket, observations, inventoryId }) {
    const integerQuantity = parseInt(quantity, 10)
    if (isNaN(integerQuantity) || integerQuantity < 0) {
      throw new Error("Ticket quantity must be a positive integer.")
    }
    // if first and last tickets are present and invalid
    if (firstTicket && lastTicket && (integerQuantity !== (parseInt(lastTicket) - parseInt(firstTicket) + 1))) {
      throw new Error("First and last tickets' numbers do not match received ticket quantity.")
    }
    this.id = id
    this.quantity = integerQuantity
    this.date = date ? new Date(date) : new Date()
    this.firstTicket = firstTicket
    this.lastTicket = lastTicket
    this.observations = observations
    this.inventoryId = inventoryId
  }
}