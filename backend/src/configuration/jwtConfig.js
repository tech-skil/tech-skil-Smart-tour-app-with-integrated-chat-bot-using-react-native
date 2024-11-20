const crypto = require("crypto");

// Generate a random secret key if not defined
//<<<<<<< master
const secretKey =
  process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");
// console.log("JWT Secret Key:", secretKey); // Log to confirm key is loaded
//=======
//const secretKey = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
//console.log("JWT Secret Key:", secretKey);  // Log to confirm key is loaded
//>>>>>>> main

module.exports = { secretKey };
