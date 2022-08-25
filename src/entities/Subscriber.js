const Location = require("./Location")

module.exports = class Subscriber {
  constructor({ id, name, birthday, document, locationId, location, isUpdated = true }) {
    this.id = id
    this.name = name
    this.birthday = birthday && new Date(birthday)
    this.document = document
    this.locationId = locationId
    this.location = location ? new Location(location) : null
    this.isUpdated = isUpdated
  }
}