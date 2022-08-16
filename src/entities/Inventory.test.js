const Inventory = require("./Inventory")

describe("Inventory Entity", function () {
  it("should create inventory with no tickets", function () {
    const inventory = new Inventory({ locationId: 1 })

    expect(inventory.tickets).toBe(0)
  })

  it("should create inventory with no withdrawals and no repositions", function () {
    const inventory = new Inventory({ locationId: 1 })

    expect(inventory.withdrawals).toEqual([])
    expect(inventory.repositions).toEqual([])
  })

  it("should throw when trying to create a inventory without a location or a locationId", function () {
    expect(() => new Inventory({ location: undefined, locationId: undefined })).toThrow("location with id or locationId is required.")
    expect(() => new Inventory({ location: {}, locationId: undefined })).toThrow("location with id or locationId is required.")
    expect(() => new Inventory({ locationId: 1 })).not.toThrow("location with id or locationId is required.")
    expect(() => new Inventory({ location: { id: 1 } })).not.toThrow("location with id or locationId is required.")
  })

  it("should throw when receiving a locationId different from location.id", function () {
    expect(() => new Inventory({ location: { id: 1 }, locationId: 2 })).toThrow("locationId doesn't match the provided location's id.")
    expect(() => new Inventory({ location: undefined, locationId: 1 })).not.toThrow("locationId doesn't match the provided location's id.")
    expect(() => new Inventory({ location: {}, locationId: 1 })).not.toThrow("locationId doesn't match the provided location's id.")
    expect(() => new Inventory({ location: { id: 1 } })).not.toThrow("locationId doesn't match the provided location's id.")
    expect(() => new Inventory({ location: { id: 1 }, locationId: 1 })).not.toThrow("locationId doesn't match the provided location's id.")
  })

  it("should create a inventory with locationId = location.id when locationId is not defined", function () {
    const inventory = new Inventory({ location: { id: 1 } })

    expect(inventory.location.id).toBe(1)
    expect(inventory.locationId).toBe(1)
  })
})