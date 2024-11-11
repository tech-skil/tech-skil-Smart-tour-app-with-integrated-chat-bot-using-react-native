require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
});

mongoose.connection.on("connected", () => {
    console.log("Connection Successful");
});

mongoose.connection.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`);
});

module.exports = mongoose;
