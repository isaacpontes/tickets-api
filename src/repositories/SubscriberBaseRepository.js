module.exports = class SubscriberBaseRepository {
  async getAll() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }

  async store(subscriber) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED")
  }
}