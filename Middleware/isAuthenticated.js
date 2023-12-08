const { decodeToken } = require("../Utils/AuthUtils");
const User = require("../Modals/UserModal");
async function isAuthenticated(req, res, next) {
  try {
    const {
      headers: { authorization: token },
    } = req;

    if (!token) {
      return res.status(401).json({ code: 401, message: "Bad Auth" });
    }

    const decodedOtp = await decodeToken(token);

    if (!decodedOtp) {
      return res.status(401).json({ code: 401, message: "Bad Auth" });
    }

    const user = await User.findOne({ email: decodedOtp.email });

    if (!user) {
      return res.status(401).json({ code: 401, message: "Bad Auth" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}

module.exports = { isAuthenticated };
