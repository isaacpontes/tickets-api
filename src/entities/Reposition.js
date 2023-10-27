module.exports = class Reposition {
  constructor({ id, quantity, date, observations, inventoryId }) {
    const integerQuantity = parseInt(quantity, 10)
    if (isNaN(integerQuantity) || integerQuantity < 0) {
      throw new Error("Ticket quantity must be a positive integer.")
    }
    if (new Date(date).getTime() > new Date().getTime()) {
      throw new Error("Reposition date cannot be in the future.")
    }
    this.id = id
    this.quantity = quantity
    this.date = date ? new Date(date) : new Date()
    this.observations = observations
    this.inventoryId = inventoryId
  }
}