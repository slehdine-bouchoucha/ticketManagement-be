const speakeasy = require("speakeasy");

const genOTPSecret = () => {
  try {
    return speakeasy.generateSecret({});
  } catch (e) {
    console.log(e);
  }
};

const verifyOTP = (base32, token) => {
  try {
    return speakeasy.totp.verify({
      secret: base32,
      encoding: "base32",
      token,
      window: 60,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { genOTPSecret, verifyOTP };
