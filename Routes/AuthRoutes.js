const express = require("express");
const AuthRouter = express.Router();

AuthRouter.post(
  "/login",
  require("../Controllers/AuthControllers/LoginController"),
);
AuthRouter.post(
  "/register",
  require("../Controllers/AuthControllers/RegisterController"),
);

AuthRouter.post(
  "/verifyOtp",
  require("../Controllers/AuthControllers/VerifyOtpController"),
);
module.exports = AuthRouter;
