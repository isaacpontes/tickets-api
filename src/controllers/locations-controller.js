const { Location } = require("../database")

module.exports = {
  async getAll(req, res) {
    try {
      const locations = await Location.findAll()
      return res.json(locations)
    } catch (err) {
      return res.status(400).json({ message: error.message })
    }
  },

  async store(req, res) {
    const { name } = req.body
    try {
      const location = await Location.create({ name })
      return res.status(201).json(location)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}