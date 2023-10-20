const Location = require("../entities/Location")

module.exports = class UpdateLocation {
  #locationRepository

  constructor(locationRepository) {
    this.#locationRepository = locationRepository
  }

  async execute(id, name) {
    await this.#locationRepository.update(id, name)
  }
}