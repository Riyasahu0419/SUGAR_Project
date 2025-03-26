const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
},{ timestamps: true });// Adds createdAt and updatedAt fields

const OTPModel=mongoose.model("OTP",OTPSchema)
module.exports=OTPModel;