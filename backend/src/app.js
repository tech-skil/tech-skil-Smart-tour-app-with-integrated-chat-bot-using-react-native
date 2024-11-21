require("dotenv").config();
const express = require("express");
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin"); // Corrected

const bodyParser = require("body-parser");
const createAdminAccount = require("./script/admin");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", signinRoute);

app.listen(PORT, () => {
//<<<<<<< master
  // console.log(`Server is running on: http://127.0.0.1:${PORT}`);
  //console.log(`Server is running on: http://localhost:${PORT}`);
//=======
    console.log(`Server is running on: http://127.0.0.1:${PORT}`);
//>>>>>>> main
});
