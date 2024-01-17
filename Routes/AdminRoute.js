const express = require("express");
const { isAuthenticated } = require("../Middleware/isAuthenticated");
const getAllUsers = require("../Controllers/AdminControllers/GetAllUsers");
const updateUser = require("../Controllers/AdminControllers/UpdateUser");
const deleteUser = require("../Controllers/AdminControllers/DeleteUser");
const AdminRouter = express.Router();

AdminRouter.get("/", isAuthenticated, getAllUsers);

AdminRouter.put("/", isAuthenticated, updateUser);
AdminRouter.delete("/", isAuthenticated, deleteUser);

module.exports = AdminRouter;
