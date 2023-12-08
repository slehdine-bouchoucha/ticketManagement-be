const User = require("../../Modals/UserModal");
const { verifyOTP } = require("../../Utils/otpUtils");
const { generateToken } = require("../../Utils/AuthUtils");

async function VerifyOTpController(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(500)
        .json({ code: 500, message: "Please Fill all the fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ code: 401, message: "User invalid" });
    }

    const isOtpValid = await verifyOTP(user.base32, otp);

    if (!isOtpValid) {
      return res
        .status(401)
        .json({ code: 401, message: "OTP Invalid please try again " });
    }

    user.isFirstTime = false;

    await user.save();

    const token = await generateToken(user.email);

    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: "An error has occurred, please Try later",
    });
  }
}

module.exports = VerifyOTpController;
