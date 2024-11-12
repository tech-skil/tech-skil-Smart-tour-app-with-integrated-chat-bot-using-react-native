const mongoose = require("../configuration/dbConfig");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role:{type:String, enum:["admin","user"], default:"user"}
    
})

module.exports = mongoose.model("user",userSchema);


