const SubscriberPostgreRepository = require("../repositories/SubscriberPostgreRepository")
const CreateSubscriber = require("../services/CreateSubscriber")
const DeleteSubscriber = require("../services/DeleteSubscriber")
const GetSubscribers = require("../services/GetSubscribers")
const GetSubscribersByLocation = require("../services/GetSubscribersByLocation")
const UpdateSubscriber = require("../services/UpdateSubscriber")

module.exports = {
  async index(req, res) {
    try {
      const subscriberPostgreRepository = new SubscriberPostgreRepository()
      const { locationId, page, limit } = req.query
      if (locationId) {
        const getSubscribersByLocation = new GetSubscribersByLocation(subscriberPostgreRepository)
        const subscribers = await getSubscribersByLocation.execute(locationId, page, limit)
        return res.json(subscribers)
      }
      const getSubscribers = new GetSubscribers(subscriberPostgreRepository)
      const subscribers = await getSubscribers.execute(page, limit)
      return res.json(subscribers)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async store(req, res) {
    try {
      const subscriberPostgreRepository = new SubscriberPostgreRepository()
      const createSubscriber = new CreateSubscriber(subscriberPostgreRepository)
      const subscriber = await createSubscriber.execute(req.body)
      return res.status(201).json(subscriber)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async update(req, res) {
    try {
      const subscriberPostgreRepository = new SubscriberPostgreRepository()
      const updateSubscriber = new UpdateSubscriber(subscriberPostgreRepository)
      await updateSubscriber.execute(req.params.id, req.body)
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  async delete(req, res) {
    try {
      const subscriberPostgreRepository = new SubscriberPostgreRepository()
      const deleteSubscriber = new DeleteSubscriber(subscriberPostgreRepository)
      await deleteSubscriber.execute(req.params.id)
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}