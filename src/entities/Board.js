const Location = require("./Location")

module.exports = class Board {
  constructor({ id, tickets, locationId, location, ticketRequests }) {
    if (!location?.id && !locationId) {
      throw new Error("location with id or locationId is required.")
    }
    if ((location?.id && locationId) && location?.id !== locationId) {
      throw new Error("locationId doesn't match the provided location's id.")
    }
    this.id = id
    this.tickets = tickets || 0
    this.location = location ? new Location(location) : null
    this.locationId = this.location === null ? locationId : location.id
    this.ticketRequests = ticketRequests || []
  }

  addTicketRequest(ticketRequest) {
    const TicketRequest = require("./TicketRequest")
    this.ticketRequests.push(new TicketRequest(ticketRequest))
  }
}