// utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "secretkey", { expiresIn: "7d" }); 
};

module.exports = generateToken;
