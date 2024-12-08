const express = require("express");
const router = express.Router();
const venderController = require("../controllers/vendercontroller");

router
  .get("/getAllVender", venderController.getAllVender)
  .post("/createVender", venderController.createVender)
  .post("/getVender", venderController.getVender)
  .post("/login", venderController.login)
  .post("/addItem", venderController.addItem)
  .delete("/deleteVender",venderController.deleteVender)

module.exports = router;
