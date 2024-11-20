const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function generateToken(user) {
  if (!secretKey) {
    throw new Error("Secret key for JWT is missing");
  }

// <<<<<<< master
  const payload = {
    // Fix spelling here to "payload"
    id: user._id,
    name: user.name,
    email: user.email, // Fix typo: use "email" instead of "role.email"
// =======
//   const payload = {   // Fix spelling here to "payload"
//     id: user._id,
//     name: user.name,
//     email: user.email,  // Fix typo: use "email" instead of "role.email"
// >>>>>>> main
    role: user.role,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

module.exports = {
  generateToken,
};
