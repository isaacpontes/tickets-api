const express = require('express');
const locationsController = require('./controllers/locations-controller');

const router = express.Router()

router.get("/hello", (req, res) => res.json({ hello: "Helo, world!" }))

router.get("/locations", locationsController.getAll)
router.post("/locations", locationsController.store)

module.exports = router