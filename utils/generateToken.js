// utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "secretkey", { expiresIn: "7d" }); // Replace with env var
};

module.exports = generateToken;
