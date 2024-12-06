const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminconroller");

router
  .get("/getAllAdmin", adminController.getAllAdmin)
  .post("/createAdmin", adminController.createAdmin)
  .post("/getAdmin", adminController.getAdmin)
  .post("/login", adminController.login);
module.exports = router;
