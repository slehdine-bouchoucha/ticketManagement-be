const express = require("express");
const { isAuthenticated } = require("../Middleware/isAuthenticated");
const GetTickets = require("../Controllers/AgentController/GetTickets");
const addReplay = require("../Controllers/AgentController/addReplay");
const AgentRouter = express.Router();
const multer = require("multer");
const GetAgentickets = require("../Controllers/AgentController/GetAgentTickets");
const storage = multer.memoryStorage();
const upload = multer({ storage });

AgentRouter.get("/:dep", isAuthenticated, GetTickets);
AgentRouter.post("/", isAuthenticated, upload.array("images"), addReplay);

module.exports = AgentRouter;
