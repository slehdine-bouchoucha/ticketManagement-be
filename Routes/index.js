const express = require("express");
const router = express.Router();

router.use("/user", require("./AuthRoutes"));
router.use("/tickets", require("./TicketsRoutes"));
router.use("/admin", require("./AdminRoute"));

module.exports = router;
