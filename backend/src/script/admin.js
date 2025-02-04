const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@triplo.com" });

    // console.log("Existing Admin Found:", existingAdmin); // Log existing admin user if found


    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin@1234", 10);
      const newAdmin = new User({
        email: "admin@triplo.com",
        name: "Admin",
        password: hashedPassword,
        role: "admin",
      });

      const savedAdmin = await newAdmin.save();
      console.log("Admin account created successfully:", savedAdmin);
    } else {
      console.log("Admin already exists!");
    }
  } catch (error) {
    console.log("Error creating admin account:", error.message);
  }
}

module.exports = createAdminAccount;
