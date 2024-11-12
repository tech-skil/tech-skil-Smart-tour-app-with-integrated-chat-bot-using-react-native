require('dotenv').config();

const express = require("express");
const signupRoute = require("./routes/signup")

const bodyParser = require("body-parser")

const app = express();

const PORT = process.env.PORT || 8000 ;

app.use(bodyParser.json())

app.use("/user" , signupRoute);

app.listen(PORT , ()=>{
    console.log(`Server is running on : http://127.0.0.1:${PORT}`)
})