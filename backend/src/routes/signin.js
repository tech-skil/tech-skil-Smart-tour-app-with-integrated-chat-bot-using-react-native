const express = require("express");
const signinController = require("../controllers/signin");

const router = express.Router();
router.post("/login", signinController.signin);

//<<<<<<< master
module.exports = router;
//=======
//module.exports = router;
//>>>>>>> main
