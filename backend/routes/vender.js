const express = require("express");
const router = express.Router();
const venderController = require("../controllers/vendercontroller");

router
  .get("/getAllVender", venderController.getAllVender)
  .post("/createVender", venderController.createVender)
  .post("/getVender", venderController.getVender);

module.exports = router;
