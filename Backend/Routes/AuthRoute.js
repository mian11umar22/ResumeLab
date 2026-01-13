const express = require("express");
const router = express.Router();
const AuthController = require("../Controller/AuthController");

router.post("/signup", AuthController.Signup);
router.post("/login", AuthController.Login);

module.exports = router;