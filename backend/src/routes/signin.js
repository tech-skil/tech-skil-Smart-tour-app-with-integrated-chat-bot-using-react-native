const express = require("express");
const signinController = require("../controllers/signin");

const router = express.Router();
router.post("/login", signinController.signin);

module.exports = router;
