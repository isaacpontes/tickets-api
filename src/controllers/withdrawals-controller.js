const WithdrawalPostgreRepository = require("../repositories/WithdrawalPostgreRepository")
const AddWithdrawal = require("../services/AddWithdrawal")
const DeleteWithdrawal = require("../services/DeleteWithdrawal")
const UpdateWithdrawal = require("../services/UpdateWithdrawal")

module.exports = {
  async save(req, res) {
    const withdrawalRepository = new WithdrawalPostgreRepository()
    const addWithdrawal = new AddWithdrawal(withdrawalRepository)

    try {
      const result = await addWithdrawal.execute(req.body)
      return res.status(201).json(result)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async update(req, res) {
    const { id } = req.params
    const { quantity, date, firstTicket, lastTicket, observations } = req.body

    const withdrawalRepository = new WithdrawalPostgreRepository()
    const updateWithdrawal = new UpdateWithdrawal(withdrawalRepository)

    try {
      await updateWithdrawal.execute(id, { quantity, date, firstTicket, lastTicket, observations })
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async delete(req, res) {
    const { id } = req.params
    const withdrawalRepository = new WithdrawalPostgreRepository()
    const deleteWithdrawal = new DeleteWithdrawal(withdrawalRepository)

    try {
      await deleteWithdrawal.execute(id)
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}