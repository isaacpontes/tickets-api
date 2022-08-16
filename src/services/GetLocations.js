const Location = require("../entities/Location")

module.exports = class GetLocations {
  constructor(locationRepository) {
    this.locationRepository = locationRepository
  }

  async execute() {
    const rows = await this.locationRepository.getAll()
    const locations = rows.map(row => new Location(row))
    return locations
  }
}