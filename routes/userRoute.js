const express = require("express");
const { success } = require("../utils/response");
const { userSignUp } = require("../controllers/userController");
const router = express.Router();

router.post("/sign-up", userSignUp);

module.exports = router;
