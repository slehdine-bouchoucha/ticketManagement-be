const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const saltRounds = 10;
const TokenSecret = "ciuhzdcjz543rdcsdo";

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  } catch (e) {
    console.log(e);
  }
};

const verifyPassword = (password, hash) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (e) {
    console.log(e);
  }
};

const generateToken = (email) => {
  try {
    return sign({ email }, TokenSecret);
  } catch (e) {
    console.log(e);
  }
};

const decodeToken = (token) => {
  try {
    return verify(token, TokenSecret);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { hashPassword, verifyPassword, generateToken, decodeToken };
