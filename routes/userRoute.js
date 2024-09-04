const express = require("express");
const { success } = require("../utils/response");
const { userSignUp } = require("../controllers/userController");
const { upload } = require("../configs/minio");
const router = express.Router();

router.post("/sign-up", upload.single("image"), userSignUp);

module.exports = router;
