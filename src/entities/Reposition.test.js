const Reposition = require("./Reposition")

describe("Reposition Entity", function () {
  it("should not create reposition when given non positive integer ticket quantity", function () {
    expect(() => new Reposition({ quantity: -10 })).toThrow()
    expect(() => new Reposition({ quantity: NaN })).toThrow()
    expect(() => new Reposition({ quantity: "10" })).not.toThrow()
    expect(() => new Reposition({ quantity: 10 })).not.toThrow()
  })
})