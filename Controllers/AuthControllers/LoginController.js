const User = require("../../Modals/UserModal");
const { verifyPassword, generateToken } = require("../../Utils/AuthUtils");
const { verifyOTP } = require("../../Utils/otpUtils");

async function LoginController(req, res) {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ code: 401, message: "Please Fill all the fields" });
    }
    if (!otp) {
      return res.status(401).json({ code: 401, message: "OTP Required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ code: 401, message: "Email or password incorrect" });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ code: 401, message: "Email or password incorrect" });
    }

    user.password = undefined;

    if (user.isFirstTime) {
      return res
        .status(401)
        .json({ code: 401, message: "FIRST_TIME_LOGIN", user });
    }

    const isOtpValid = verifyOTP(user.base32, otp);

    if (!isOtpValid) {
      return res.status(401).json({ code: 401, message: "Otp not valid" });
    }

    const token = await generateToken(user.email);

    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    if (err.code === 11000 || err.code === 11001) {
      return res
        .status(401)
        .json({ code: 401, message: "email is already taken" });
    } else {
      return res.status(500).json({
        code: 500,
        message: "An error has occurred, please Try later",
      });
    }
  }
}

module.exports = LoginController;
