const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventcontroller");

router
  .get("/getAllEvent", eventController.getAllEvent)
  .post("/createEvent", eventController.createEvent)
  .post("/getEvent", eventController.getEvent);

module.exports = router;
