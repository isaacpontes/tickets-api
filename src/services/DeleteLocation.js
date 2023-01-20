module.exports = class DeleteLocation {
  #locationRepository

  constructor(locationRepository) {
    this.#locationRepository = locationRepository
  }

  async execute(locationId) {
    const err = await this.#locationRepository.delete(locationId)
    if (err) throw err
  }
}