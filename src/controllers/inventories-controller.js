const InventoryPostgreRepository = require("../repositories/InventoryPostgreRepository")
const AddReposition = require("../services/AddReposition")
const AddWithdrawal = require("../services/AddWithdrawal")
const CreateInventory = require("../services/CreateInventory")
const GetInventories = require("../services/GetInventories")
const GetInventoryById = require("../services/GetInventoryById")

module.exports = {
  async index(req, res) {
    try {
      const inventoryPostgreRepository = new InventoryPostgreRepository()
      const getInventories = new GetInventories(inventoryPostgreRepository)
      const inventories = await getInventories.execute()
      return res.json(inventories)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async store(req, res) {
    try {
      const inventoryPostgreRepository = new InventoryPostgreRepository()
      const createInventory = new CreateInventory(inventoryPostgreRepository)
      const inventory = await createInventory.execute(req.body.locationId)
      return res.status(201).json(inventory)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params
      const inventoryPostgreRepository = new InventoryPostgreRepository()
      const getInventoryById = new GetInventoryById(inventoryPostgreRepository)
      const inventory = await getInventoryById.execute(id)
      return res.json(inventory)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async withdraw(req, res) {
    const { id: inventoryId } = req.params
    const { quantity, date, firstTicket, lastTicket, observations } = req.body

    try {
      const inventoryPostgreRepository = new InventoryPostgreRepository()
      const addWithdrawal = new AddWithdrawal(inventoryPostgreRepository)
      const result = await addWithdrawal.execute({
        inventoryId: inventoryId,
        quantity: quantity,
        date: date,
        firstTicket: firstTicket,
        lastTicket: lastTicket,
        observations: observations
      })
      return res.status(201).json(result)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async addReposition(req, res) {
    const { id: inventoryId } = req.params
    const { quantity, date, observations } = req.body

    try {
      const inventoryPostgreRepository = new InventoryPostgreRepository()
      const addReposition = new AddReposition(inventoryPostgreRepository)
      const result = await addReposition.execute({ quantity, date, observations, inventoryId })
      return res.status(201).json(result)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}