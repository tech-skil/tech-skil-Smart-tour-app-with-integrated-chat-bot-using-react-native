const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");

async function signin(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    // console.log("Existing User Found in Signin:", existingUser);

    if (!existingUser) {
      throw new Error("Invalid email or password");
    }

    // Ensure the password argument is correct
    if (!password) {
      throw new Error("Password is required");
    }

    // Debugging logs to check values passed to bcrypt.compare
    // console.log("Plain text password:", password);
    // console.log("Hashed password from DB:", existingUser.password);

    // Compare the plain password with the hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }

    const token = generateToken(existingUser);
    return token;
  } catch (error) {
    console.log("Login error:", error.message);
    throw new Error("Invalid credentials");
  }
}

module.exports = { signin };
