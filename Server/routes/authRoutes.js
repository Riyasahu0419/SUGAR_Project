const express = require("express");

const {sendOTP , verifyOTP} = require("../controllers/authController")

const router=express.Router();

router.post("/user" , sendOTP);
router.post("/user/verifyOTP" , verifyOTP);

module.exports=router;