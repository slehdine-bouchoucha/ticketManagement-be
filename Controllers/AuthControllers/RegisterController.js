const User = require("../../Modals/UserModal");

const { hashPassword } = require("../../Utils/AuthUtils");
const { genOTPSecret } = require("../../Utils/otpUtils");

async function RegisterController(req, res) {
  try {
    const { userName, fullName, email, password } = req.body;

    if (!userName || !fullName || !email || !password) {
      return res
        .status(500)
        .json({ code: 500, message: "Please Fill all the fields" });
    }

    const savedUser = await User.findOne({ email });

    if (savedUser) {
      return res
        .status(401)
        .json({ code: 401, message: "Email is already taken" });
    }

    const otp = genOTPSecret();
    const passwordHash = await hashPassword(password);

    const newUser = new User({
      userName,
      fullName,
      email,
      password: passwordHash,
      ascii: otp.ascii,
      hex: otp.hex,
      base32: otp.base32,
      otpauth_url: otp.otpauth_url,
    });

    const user = await newUser.save();

    user.password = undefined;

    return res.status(200).json({ user });
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

module.exports = RegisterController;
