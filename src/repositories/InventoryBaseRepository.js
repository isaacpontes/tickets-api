module.exports = class InventoryBaseRepository {
  async getAll() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async getByLocationId(locationId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async store(inventory) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async addTicketReposition(reposition) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async withdrawTickets(withdrawal) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }
}