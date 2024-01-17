const express = require("express");
const router = express.Router();

router.use("/user", require("./AuthRoutes"));
router.use("/tickets", require("./TicketsRoutes"));
router.use("/admin", require("./AdminRoute"));
router.use("/agent", require("./AgentRoute"));
module.exports = router;
