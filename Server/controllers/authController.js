// const User = require("../models/User");
// const twilio = require("twilio");
// require("dotenv").config();

// // This is the problem - you're using TWILIO_SID instead of TWILIO_ACCOUNT_SID
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// exports.sendOtp = async (req, res) => {
//     let { phoneNumber } = req.body;
    
//     if (!phoneNumber.startsWith("+91")) {
//         phoneNumber = `+91${phoneNumber.trim()}`;
//     }
    
//     if (phoneNumber.length !== 13) {
//         return res.status(400).json({ message: "Invalid phone number format." });
//     }
    
//     try {
//         console.log("🔹 Sending OTP to:", phoneNumber);
//         console.log("🔹 TWILIO_SERVICE_SID:", process.env.TWILIO_SERVICE_SID); // Debugging
        
//         const verification = await client.verify.v2
//             .services(process.env.TWILIO_SERVICE_SID)
//             .verifications.create({ to: phoneNumber, channel: "sms" });
        
//         return res.json({ message: "OTP sent successfully.", sid: verification.sid });
//     } catch (error) {
//         console.error("❌ Twilio Error:", error);
//         return res.status(500).json({ message: "Error sending OTP", error: error.message });
//     }
// };

// exports.verifyOtp = async (req, res) => {
//     try {
//         const { otp } = req.body;
//         if (!otp || otp.length !== 6) {
//             return res.status(400).json({ message: "Enter a valid 6-digit OTP." });
//         }

//         console.log(`Verifying OTP for: ${phoneNumber}`);

//     } catch (err) {
//         console.error("❌ Error verifying OTP:", err);
//         res.status(500).json({ message: "Server error while verifying OTP." });
//     }
// };



const User = require("../models/User");
const twilio = require("twilio");
require("dotenv").config();

// Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ Send OTP (Twilio Verify API)
exports.sendOtp = async (req, res) => {
    let { phoneNumber } = req.body;

    if (!phoneNumber.startsWith("+91")) {
        phoneNumber = `+91${phoneNumber.trim()}`;
    }

    if (!/^\+91\d{10}$/.test(phoneNumber)) {
        return res.status(400).json({ message: "Invalid phone number format." });
    }

    try {
        console.log("🔹 Sending OTP to:", phoneNumber);

        const verification = await client.verify.v2
            .services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phoneNumber, channel: "sms" });

        return res.json({ message: "OTP sent successfully.", sid: verification.sid });
    } catch (error) {
        console.error("❌ Twilio Error:", error);
        return res.status(500).json({ message: "Error sending OTP", error: error.message });
    }
};

// ✅ Verify OTP (Twilio Verify API)
exports.verifyOtp = async (req, res) => {
    try {
        const { otp, phoneNumber } = req.body;

        if (!otp || otp.length !== 6) {
            return res.status(400).json({ message: "Enter a valid 6-digit OTP." });
        }

        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required for verification." });
        }

        console.log(`🔹 Verifying OTP for: ${phoneNumber}`);

        const verificationCheck = await client.verify.v2
            .services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phoneNumber, code: otp });

        if (verificationCheck.status === "approved") {
            return res.status(200).json({ message: "OTP verified successfully." });
        } else {
            return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }
    } catch (err) {
        console.error("❌ Error verifying OTP:", err);
        res.status(500).json({ message: "Server error while verifying OTP." });
    }
};
