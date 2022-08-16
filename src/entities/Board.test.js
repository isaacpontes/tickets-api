const Board = require("./Board")

describe("Board Entity", function () {
  it("should create a board with no tickets", function () {
    const board = new Board({ locationId: 1 })

    expect(board.tickets).toBe(0)
  })

  it("should create a board with no ticket requests", function () {
    const board = new Board({ locationId: 1 })

    expect(board.ticketRequests).toEqual([])
  })

  it("should throw when trying to create a board without a location or a locationId", function () {
    expect(() => new Board({ location: undefined, locationId: undefined })).toThrow("location with id or locationId is required.")
    expect(() => new Board({ location: {}, locationId: undefined })).toThrow("location with id or locationId is required.")
    expect(() => new Board({ locationId: 1 })).not.toThrow("location with id or locationId is required.")
    expect(() => new Board({ location: { id: 1 } })).not.toThrow("location with id or locationId is required.")
  })

  it("should throw when receiving a locationId different from location.id", function () {
    expect(() => new Board({ location: { id: 1 }, locationId: 2 })).toThrow("locationId doesn't match the provided location's id.")
    expect(() => new Board({ location: undefined, locationId: 1 })).not.toThrow("locationId doesn't match the provided location's id.")
    expect(() => new Board({ location: {}, locationId: 1 })).not.toThrow("locationId doesn't match the provided location's id.")
    expect(() => new Board({ location: { id: 1 } })).not.toThrow("locationId doesn't match the provided location's id.")
    expect(() => new Board({ location: { id: 1 }, locationId: 1 })).not.toThrow("locationId doesn't match the provided location's id.")
  })

  it("should create a board with locationId = location.id when locationId is not defined", function () {
    const board = new Board({ location: { id: 1 } })

    expect(board.location.id).toBe(1)
    expect(board.locationId).toBe(1)
  })
})