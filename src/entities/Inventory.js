const Location = require("./Location")
const Reposition = require("./Reposition")
const Withdrawal = require("./Withdrawal")

module.exports = class Inventory {
  constructor({ id, tickets, locationId, location, withdrawals, repositions }) {
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
    this.withdrawals = withdrawals
    this.repositions = repositions
  }

  addReposition(reposition) {
    this.repositions.push(new Reposition(reposition))
  }

  addWithdrawal(withdrawal) {
    this.withdrawals.push(new Withdrawal(withdrawal))
  }
}