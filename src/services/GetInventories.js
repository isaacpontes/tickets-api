const Inventory = require("../entities/Inventory")

module.exports = class GetInventories {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository
  }

  async execute() {
    const rows = await this.inventoryRepository.getAll()
    const inventories = rows.map(row => new Inventory(row))
    return inventories
  }
}