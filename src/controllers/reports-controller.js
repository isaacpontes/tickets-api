const BoardPostgreRepository = require("../repositories/BoardPostgreRepository")
const InventoryPostgreRepository = require("../repositories/InventoryPostgreRepository")
const GetMonthlyGeneralBalance = require("../services/GetMonthlyGeneralBalance")

module.exports = {
  async monthly(req, res) {
    try {
      const month = req.query.month || (new Date().getMonth() + 1)
      const year = req.query.year || new Date().getFullYear()
      const inventoryPostgreRepository = new InventoryPostgreRepository()
      const boardPostgreRepository = new BoardPostgreRepository()
      const getMonthlyGeneralBalance = new GetMonthlyGeneralBalance(inventoryPostgreRepository, boardPostgreRepository)
      console.log(getMonthlyGeneralBalance)
      const result = await getMonthlyGeneralBalance.execute(month, year)
      return res.json(result)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}