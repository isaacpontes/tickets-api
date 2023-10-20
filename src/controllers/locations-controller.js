const LocationPostgreRepository = require("../repositories/LocationPostgreRepository")
const GetLocations = require("../services/GetLocations")
const CreateLocation = require("../services/CreateLocation")
const InventoryPostgreRepository = require("../repositories/InventoryPostgreRepository")
const BoardPostgreRepository = require("../repositories/BoardPostgreRepository")
const DeleteLocation = require("../services/DeleteLocation")
const UpdateLocation = require("../services/UpdateLocation")

module.exports = {
  async index(req, res) {
    try {
      const locationPostgreRepository = new LocationPostgreRepository()
      const getLocations = new GetLocations(locationPostgreRepository)
      const locations = await getLocations.execute()
      return res.json(locations)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async store(req, res) {
    try {
      const locationPostgreRepository = new LocationPostgreRepository()
      const inventoryPostgreRepository = new InventoryPostgreRepository()
      const boardPostgreRepository = new BoardPostgreRepository()
      const createLocation = new CreateLocation(locationPostgreRepository, inventoryPostgreRepository, boardPostgreRepository)
      const result = await createLocation.execute(req.body.name)
      return res.status(201).json(result)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async update(req, res) {
    const { id } = req.params
    const { name } = req.body
    console.log(id, name)
    const locationPostgreRepository = new LocationPostgreRepository()
    const updateLocation = new UpdateLocation(locationPostgreRepository)
    try {
      await updateLocation.execute(id, name)
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params
      const locationPostgreRepository = new LocationPostgreRepository()
      const deleteLocation = new DeleteLocation(locationPostgreRepository)
      await deleteLocation.execute(id)
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}