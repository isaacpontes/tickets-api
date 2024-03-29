const express = require('express');
const boardsController = require('./controllers/boards-controller');
const inventoriesController = require('./controllers/inventories-controller');
const locationsController = require('./controllers/locations-controller');
const reportsController = require('./controllers/reports-controller');
const subscribersController = require('./controllers/subscribers-controller');
const withdrawalsController = require('./controllers/withdrawals-controller');

const router = express.Router()

router.get("/hello", (req, res) => res.json({ hello: "Helo, world!" }))

router.get("/locations", locationsController.index)
router.get("/locations/:id/subscribers", subscribersController.searchByLocation)
router.post("/locations", locationsController.store)
router.put("/locations/:id", locationsController.update)
router.delete("/locations/:id", locationsController.delete)

router.get("/inventories", inventoriesController.index)
router.post("/inventories", inventoriesController.store)
router.get("/inventories/:id", inventoriesController.show)
router.post("/inventories/:id/add-reposition", inventoriesController.addReposition)

router.post("/withdrawals", withdrawalsController.save)
router.put("/withdrawals/:id", withdrawalsController.update)
router.delete("/withdrawals/:id", withdrawalsController.delete)

router.get("/boards", boardsController.index)
router.post("/boards", boardsController.store)
router.post("/boards/:id/add-request", boardsController.addRequest)

router.get("/subscribers", subscribersController.index)
router.get("/subscribers/search", subscribersController.search)
router.post("/subscribers", subscribersController.store)
router.put("/subscribers/:id", subscribersController.update)
router.delete("/subscribers/:id", subscribersController.delete)

router.get("/reports/general/monthly", reportsController.monthly)

module.exports = router