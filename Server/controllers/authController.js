const User = require("../models/User");
const twilio = require("twilio");
require("dotenv").config();

// This is the problem - you're using TWILIO_SID instead of TWILIO_ACCOUNT_SID
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOtp = async (req, res) => {
    let { phoneNumber } = req.body;
    
    if (!phoneNumber.startsWith("+91")) {
        phoneNumber = `+91${phoneNumber.trim()}`;
    }
    
    if (phoneNumber.length !== 13) {
        return res.status(400).json({ message: "Invalid phone number format." });
    }
    
    try {
        console.log("🔹 Sending OTP to:", phoneNumber);
        console.log("🔹 TWILIO_SERVICE_SID:", process.env.TWILIO_SERVICE_SID); // Debugging
        
        const verification = await client.verify.v2
            .services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phoneNumber, channel: "sms" });
        
        return res.json({ message: "OTP sent successfully.", sid: verification.sid });
    } catch (error) {
        console.error("❌ Twilio Error:", error);
        return res.status(500).json({ message: "Error sending OTP", error: error.message });
    }
};

// exports.verifyOtp = async () => {
//     // if (!otp || otp.length !== 6) {
//     //   setError("Enter a valid 6-digit OTP");
//     //   return;
//     // }
//     // setError("");
  
//     // Format phone number consistently with sendOtp
//     let formattedPhone = phoneNumber.trim();
//     if (!formattedPhone.startsWith("+91")) {
//       formattedPhone = `+91${formattedPhone}`;
//     }
  
//     try {
//       const response = await fetch("http://localhost:5000/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber: formattedPhone, otp }),
//       });
  
//       const data = await response.json();
//       console.log("Server response:", data); // Log the complete response
  
//       if (!response.ok) {
//         throw new Error(data.message || "OTP verification failed");
//       }
  
//       // Check for success message instead of token
//       if (data.message === "OTP verified successfully.") {
//         alert("Login successful!");
//         setIsLoggedIn(true);
//         closeModal();
//       } else {
//         setError("Invalid OTP. Please try again.");
//       }
//     } catch (err) {
//       console.error("❌ Error verifying OTP:", err);
//       setError(err.message || "Error verifying OTP. Please try again.");
//     }
//   };

exports.verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required." });
        }

        if (!otp || otp.length !== 6) {
            return res.status(400).json({ message: "Enter a valid 6-digit OTP." });
        }

        console.log(`Verifying OTP for: ${phoneNumber}`);

        // Simulated OTP verification
        if (otp === "123456") { 
            return res.json({ message: "OTP verified successfully.", token: "fake_jwt_token" });
        } else {
            return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }
    } catch (err) {
        console.error("❌ Error verifying OTP:", err);
        res.status(500).json({ message: "Server error while verifying OTP." });
    }
};
