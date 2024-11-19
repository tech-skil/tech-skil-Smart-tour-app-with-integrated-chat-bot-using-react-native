const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function generateToken(user) {
  if (!secretKey) {
    throw new Error("Secret key for JWT is missing");
  }

  const payload = {
    // Fix spelling here to "payload"
    id: user._id,
    name: user.name,
    email: user.email, // Fix typo: use "email" instead of "role.email"
    role: user.role,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

module.exports = {
  generateToken,
};
