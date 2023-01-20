module.exports = class SubscriberBaseRepository {
  async getAll(page, limit) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async getById(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async getByLocation(locationId, page, limit) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async searchByName(name, page, limit) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async store(subscriber) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async update(subscriber) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async delete(subscriber) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async countAll() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async countByLocation(locationId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }
}