// const OTP = require('../models/OTP')
// const User=require("../models/User")
// const {sendOTP}=require("../config/twilio")
// const generateOTP=require("../utils/genrateOTP")
// const jwt=require("jsonwebtoken")



// exports.sendOTP = async (req, res) => {
//     try {
//         console.log("🔹 Received request body:", req.body);

//         const { phone } = req.body; // 🔹 Ensure frontend sends "phone" instead of "phoneNumber"
//         if (!phone) {
//             console.error("❌ Missing phone number in request");
//             return res.status(400).json({ error: "Phone number is required" });
//         }

//         const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string
//         const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//         console.log(`🔹 Generated OTP: ${otp}, Expires at: ${expiresAt}`);

//         await OTP.create({ phone, otp, expiresAt });

//         try {
//             await sendOTP(phone, otp);
//             console.log("✅ OTP sent successfully to", phone);
//         } catch (twilioError) {
//             console.error("❌ Twilio Error:", twilioError);
//             return res.status(500).json({ error: "Failed to send OTP via Twilio" });
//         }

//         res.json({ message: "OTP sent successfully" });

//     } catch (error) {
//         console.error("❌ Error in sendOTP:", error);
//         res.status(500).json({ error: "Error sending OTP", details: error.message });
//     }
// };



// exports.verifyOTP = async (req, res) => {
//     const { phone, otp } = req.body; // ✅ Ensure phone and otp are extracted

//     console.log("🔹 Received request to verify OTP:", { phone, otp });

//     if (!phone || !otp) {
//         console.error("❌ Missing phone or OTP in request body.");
//         return res.status(400).json({ error: "Phone and OTP are required." });
//     }

//     try {
//         // ✅ Log what's in the database
//         const otpRecords = await OTP.find({ phone }); // Fetch all OTPs for debugging
//         console.log("🔹 OTPs found in DB for phone:", phone, otpRecords);

//         // ✅ Find OTP using both phone and otp
//         const otpRecord = await OTP.findOne({ phone, otp: String(otp) });

//         console.log("🔹 Matching OTP record found:", otpRecord);

//         if (!otpRecord) {
//             console.error("❌ Invalid OTP for phone:", phone);
//             return res.status(400).json({ error: "Invalid OTP" });
//         }

//         if (!otpRecord.expiresAt || otpRecord.expiresAt < new Date()) {
//             console.error("❌ OTP Expired:", otpRecord);
//             return res.status(400).json({ error: "OTP expired" });
//         }

//         let user = await User.findOne({ phone });
//         if (!user) {
//             user = await User.create({ phone, verified: true });
//         }

//         await OTP.deleteMany({ phone }); // ✅ Delete OTPs for this phone
//         console.log("✅ Deleted OTPs for:", phone);

//         const token = jwt.sign({ id: user._id, phone }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.json({ message: "OTP verified", token });

//     } catch (error) {
//         console.error("❌ Error verifying OTP:", error);
//         res.status(500).json({ error: "Error verifying OTP" });
//     }
// };



const OTP = require('../models/OTP')
const User = require("../models/User")
const { sendOTP: twilioSendOTP } = require("../config/twilio")
const jwt = require('jsonwebtoken')

// Utility function to generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOTP = async (req, res) => {
    try {
        const { phone } = req.body;
        
        // Validate phone number
        if (!phone) {
            return res.status(400).json({ 
                error: "Phone number is required",
                details: "Phone number cannot be empty" 
            });
        }

        // Validate phone number format (adjust regex as needed)
        const phoneRegex = /^\+[1-9]\d{10,14}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ 
                error: "Invalid phone number format", 
                details: "Phone number must start with + and country code" 
            });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        try {
            // Set a longer timeout for database operations
            const deleteOptions = { 
                maxTimeMS: 30000 // 30 seconds timeout 
            };

            // Clear existing OTPs for this phone number
            await OTP.deleteMany({ phone }, deleteOptions);

            // Create new OTP record
            const otpRecord = await OTP.create({ 
                phone, 
                otp, 
                expiresAt 
            });

            // Send OTP via Twilio
            const twilioResponse = await twilioSendOTP(phone, otp);
            
            if (!twilioResponse.success) {
                // Rollback OTP record creation
                await OTP.deleteOne({ _id: otpRecord._id });
                
                return res.status(500).json({ 
                    error: "OTP Sending Failed",
                    details: twilioResponse.message 
                });
            }

            // Log successful OTP generation
            console.log(`✅ OTP Generated for ${phone}: ${otp}`);

            return res.status(200).json({ 
                message: "OTP sent successfully", 
                debug: { 
                    otpLength: otp.length,
                    phone: phone 
                } 
            });

        } catch (processError) {
            console.error("❌ OTP Process Error:", processError);
            return res.status(500).json({ 
                error: "OTP Generation Failed", 
                details: processError.message 
            });
        }

    } catch (error) {
        console.error("❌ Unexpected Server Error:", error);
        return res.status(500).json({ 
            error: "Internal Server Error", 
            details: "An unexpected error occurred during OTP process" 
        });
    }
};

// Verify OTP method remains the same as in previous implementation
exports.verifyOTP = async (req, res) => {
    const { phone, otp } = req.body;

    console.log(`🔸 OTP Verification Process`);
    console.log(`Received Phone: ${phone}`);
    console.log(`Received OTP: ${otp}`);

    if (!phone || !otp) {
        return res.status(400).json({ error: "Phone and OTP are required." });
    }

    try {
        // Find the most recent OTP record
        const otpRecord = await OTP.findOne({ 
            phone, 
            expiresAt: { $gt: new Date() } 
        }).sort({ createdAt: -1 });

        console.log(`🔸 Matching OTP Record:`, otpRecord);

        if (!otpRecord) {
            return res.status(400).json({ 
                error: "No valid OTP found. Request a new OTP.",
                details: {
                    phone: phone,
                    timestamp: new Date().toISOString()
                }
            });
        }

        // Strict OTP comparison
        const isOTPValid = otpRecord.otp === otp;

        if (!isOTPValid) {
            console.error(`❌ OTP Verification Failed`);
            console.error(`Stored OTP: ${otpRecord.otp}`);
            console.error(`Received OTP: ${otp}`);
            
            return res.status(400).json({ 
                error: "Invalid OTP. Please try again.",
                debug: {
                    storedOTP: otpRecord.otp,
                    receivedOTP: otp,
                    phone: phone
                }
            });
        }

        // User management
        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({ phone, verified: true });
        }

        // Clean up OTP records
        await OTP.deleteMany({ phone });

        // Generate authentication token
        const token = jwt.sign({ 
            id: user._id, 
            phone 
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ 
            message: "OTP verified successfully", 
            token,
            userId: user._id
        });

    } catch (error) {
        console.error("❌ Verification Process Error:", error);
        res.status(500).json({ 
            error: "OTP verification failed", 
            details: error.message 
        });
    }
};