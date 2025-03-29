const express = require("express");
const router = express.Router();

// ✅ Correctly import controller functions
const { sendOtp, verifyOtp } = require("../controllers/authController");

// ✅ Ensure routes are correctly set
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);



module.exports = router;
