const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/vender", require("./vender"));
router.use("/admin", require("./admin"));
router.use("/event", require("./event"));

module.exports = router;
