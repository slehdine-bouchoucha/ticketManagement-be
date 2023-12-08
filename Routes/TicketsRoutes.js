const express = require("express");
const { isAuthenticated } = require("../Middleware/isAuthenticated");
const TicketRouter = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

TicketRouter.post(
  "/",
  isAuthenticated,
  upload.array("images"),
  require("../Controllers/TicketsControllers/AddTicketController")
);

TicketRouter.get(
  "/",
  isAuthenticated,
  require("../Controllers/TicketsControllers/GetTicketsController")
);
TicketRouter.put(
  "/:ticketId",
  isAuthenticated,
  require("../Controllers/TicketsControllers/StatusTicketController")
);
module.exports = TicketRouter;
