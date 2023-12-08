const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, uppercase: true, trim: true },
    fullName: { type: String, required: true, lowercase: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
      unique: [true, "Email must be unique."],
    },
    password: { type: String, required: true, min: 5 },
    role: { type: String, default: "USER" },
    departement: { type: String, default: null },
    ascii: { type: String, required: true },
    hex: { type: String, required: true },
    base32: { type: String, required: true },
    otpauth_url: { type: String, required: true },
    isFirstTime: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
