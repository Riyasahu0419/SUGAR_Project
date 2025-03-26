// require("dotenv").config();
// const twilio = require("twilio");

// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// if (!accountSid || !authToken || !twilioPhoneNumber) {
//   throw new Error("❌ Twilio credentials are missing. Check your .env file.");
// }

// const client = twilio(accountSid, authToken);
// const otpStore = {};

// const sendOTP = async (phoneNumber) => {
//   try {
//     if (!phoneNumber) {
//       throw new Error("Phone number is required.");
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     console.log(`✅ Generated OTP for ${phoneNumber}: ${otp}`);

//     // Send OTP via Twilio
//     const message = await client.messages.create({
//       body: `Your OTP code is: ${otp}`,
//       from: twilioPhoneNumber,
//       to: phoneNumber,
//     });

//     otpStore[phoneNumber] = otp;
//     setTimeout(() => delete otpStore[phoneNumber], 5 * 60 * 1000);

//     console.log("✅ OTP sent successfully:", message.sid);
//     return { success: true, message: "OTP sent successfully" };

//   } catch (error) {
//     console.error("❌ Twilio Error:", error.message);

//     if (error.code === 63038) {
//       return { success: false, message: "Daily OTP limit exceeded. Try again tomorrow or contact support." };
//     }

//     return { success: false, message: "Failed to send OTP via Twilio." };
//   }
// };

// const verifyOTP = (phoneNumber, enteredOtp) => {
//   if (otpStore[phoneNumber] && otpStore[phoneNumber] == enteredOtp) {
//     delete otpStore[phoneNumber];
//     return { success: true, message: "OTP verified successfully" };
//   } else {
//     return { success: false, message: "Invalid OTP or expired" };
//   }
// };

// module.exports = { sendOTP, verifyOTP };







const twilio = require("twilio");
const crypto = require('crypto');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  throw new Error("❌ Twilio credentials are missing. Check your .env file.");
}

const client = twilio(accountSid, authToken);

const sendOTP = async (phoneNumber) => {
  try {
    if (!phoneNumber) {
      throw new Error("Phone number is required.");
    }

    // Use crypto for secure, consistent OTP generation
    const otp = crypto.randomInt(100000, 999999).toString().padStart(6, '0');
    console.log(`✅ Generated OTP for ${phoneNumber}: ${otp}`);

    // Send OTP via Twilio
    const message = await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    console.log("✅ OTP sent successfully:", message.sid);
    
    return { 
      success: true, 
      message: "OTP sent successfully", 
      otp: otp  // Return the generated OTP for database storage
    };

  } catch (error) {
    console.error("❌ Twilio Error:", error.message);

    if (error.code === 63038) {
      return { 
        success: false, 
        message: "Daily OTP limit exceeded. Try again tomorrow or contact support." 
      };
    }

    return { 
      success: false, 
      message: "Failed to send OTP via Twilio." 
    };
  }
};

module.exports = { sendOTP };