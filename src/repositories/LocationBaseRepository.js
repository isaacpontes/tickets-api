module.exports = class LocationBaseRepository {
  async getAll() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async store(location) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async update(location) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async delete(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }
}