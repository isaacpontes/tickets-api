const Inventory = require("../entities/Inventory")

module.exports = class GetInventoryById {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository
  }

  async execute(id) {
    const inventory = await this.inventoryRepository.getById(id)
    return inventory
  }
}