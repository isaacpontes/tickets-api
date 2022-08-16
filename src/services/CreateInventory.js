const Inventory = require("../entities/Inventory")

module.exports = class CreateInventory {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository
  }

  async execute(locationId) {
    const inventoryExists = await this.inventoryRepository.getByLocationId(locationId)
    if (inventoryExists) {
      return new Inventory(inventoryExists)
    }
    const inventory = new Inventory({ locationId })
    const persistedInventory = await this.inventoryRepository.store(inventory)
    inventory.id = persistedInventory.id
    return inventory
  }
}