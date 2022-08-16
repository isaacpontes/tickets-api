const Withdrawal = require("./Withdrawal")

describe("Withdrawal Entity", function () {
  it("should not create withdrawal when given non positive integer ticket quantity", function () {
    expect(() => new Withdrawal({ quantity: -10 })).toThrow()
    expect(() => new Withdrawal({ quantity: NaN })).toThrow()
    expect(() => new Withdrawal({ quantity: "10" })).not.toThrow()
    expect(() => new Withdrawal({ quantity: 10 })).not.toThrow()
  })

  it("should not create withdrawal when first and last tickets' numbers do not match received quantity", function () {
    const quantity = 10

    expect(() => new Withdrawal({ quantity, firstTicket: "1", lastTicket: "9" })).toThrow()
    expect(() => new Withdrawal({ quantity, firstTicket: "1", lastTicket: "11" })).toThrow()
    expect(() => new Withdrawal({ quantity, firstTicket: "1", lastTicket: "10" })).not.toThrow()
  })
})