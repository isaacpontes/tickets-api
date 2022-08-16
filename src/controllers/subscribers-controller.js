const SubscriberPostgreRepository = require("../repositories/SubscriberPostgreRepository")
const CreateSubscriber = require("../services/CreateSubscriber")
const GetSubscribers = require("../services/GetSubscribers")

module.exports = {
  async index(req, res) {
    try {
      const subscriberPostgreRepository = new SubscriberPostgreRepository()
      const getSubscribers = new GetSubscribers(subscriberPostgreRepository)
      const subscribers = await getSubscribers.execute()
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
  }
}