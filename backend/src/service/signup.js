const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createUser(userData) {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required fields.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error(
      "Email is already registered. Please use a different email."
    );
  }

  const saltRounds = 10;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password.");
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  try {
    const savedUser = await createdUser.save();
    return savedUser;
  } catch (error) {
    console.error("Error saving user:", error);
    throw new Error("Failed to save user.");
  }
}

module.exports = { createUser };
