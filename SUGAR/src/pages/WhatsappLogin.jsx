// import React, { useState, useEffect } from "react";
// import { X, User } from "lucide-react";

// const WhatsappLogin = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [phoneNumber, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [error, setError] = useState("");
//   const [timer, setTimer] = useState(30);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);

//   useEffect(() => {
//     let countdown;
//     if (isOtpSent && timer > 0) {
//       countdown = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setIsResendDisabled(false);
//       setOtp(""); // Clears OTP input after 30 seconds
//     }
//     return () => clearInterval(countdown);
//   }, [isOtpSent, timer]);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => {
//     setIsOpen(false);
//     setPhone("");
//     setOtp("");
//     setIsOtpSent(false);
//     setError("");
//     setTimer(30);
//     setIsResendDisabled(true);
//   };

//   const sendOtp = async () => {
//     let formattedPhone = phoneNumber.trim();
    
//     // Ensure the number is in correct E.164 format (+91XXXXXXXXXX)
//     if (!formattedPhone.startsWith("+91")) {
//         formattedPhone = `+91${formattedPhone}`;
//     }

//     if (formattedPhone.length !== 13) {
//         console.error("❌ Invalid phone number format:", formattedPhone);
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:5000/auth/send-otp", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ phoneNumber: formattedPhone }),
//         });

//         const data = await response.json();
//         console.log("✅ Server Response:", data);
//     } catch (error) {
//         console.error("❌ Error sending OTP:", error);
//     }
// };


//   const verifyOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       setError("Enter a valid 6-digit OTP");
//       return;
//     }
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber, otp }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "OTP verification failed");
//       }

//       if (data.token) {
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

//   return (
//     <div className="font-sans">
//       <button onClick={openModal} className="text-gray-800 hover:text-pink-500 transition duration-200 hover:cursor-pointer">
//         <User size={25} />
//       </button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-lg max-w-lg w-full p-10 shadow-lg">
//             <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer ">
//               <X size={28} />
//             </button>

//             {!isOtpSent ? (
//               <>
//                 <div className="relative h-48 bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
//                   <div className="text-center z-10">
//                     <h1 className="text-4xl font-bold text-white tracking-wide">SUGAR</h1>
//                     <p className="text-white mt-2 text-lg font-light">Rule the world, one look at a time ;)</p>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="mb-4">
//                     <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       id="phone"
//                       type="tel"
//                       placeholder="Enter your phone number"
//                       value={phoneNumber}
//                       onChange={(e) => setPhone(e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
//                     />
//                   </div>
//                   {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//                   <button
//                     onClick={sendOtp}
//                     className="w-full flex items-center justify-center bg-pink-400 text-white py-3 rounded-lg hover:bg-purple-400 transition duration-300 space-x-2 cursor-pointer"
//                   >
//                     WhatsApp Login
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter OTP</h2>
//                 <input
//                   type="text"
//                   placeholder="Enter 6-digit OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-3 text-lg mb-2"
//                   disabled={timer === 0}
//                 />
//                 <p className="text-gray-600 text-sm mb-2">OTP expires in: {timer}s</p>
//                 {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//                 <button onClick={verifyOtp} className="w-full bg-blue-500 text-white rounded-md p-3 mt-2 cursor-pointer">
//                   Verify OTP
//                 </button>
//                 <button
//                   onClick={sendOtp}
//                   className={`w-full bg-gray-400 text-white rounded-md p-3 mt-2 ${isResendDisabled ? "opacity-50 cursor-not-allowed" : "bg-pink-400 hover:bg-purple-400 cursor-pointer"}`}
//                   disabled={isResendDisabled}
//                 >
//                   Resend OTP
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WhatsappLogin;









import React, { useState, useEffect } from "react";
import { X, User } from "lucide-react";

const WhatsappLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let countdown;
    if (isOtpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      setOtp("");
    }
    return () => clearInterval(countdown);
  }, [isOtpSent, timer]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setPhoneNumber("");
    setOtp("");
    setIsOtpSent(false);
    setError("");
    setTimer(30);
    setIsResendDisabled(true);
  };

  const sendOtp = async () => {
    let formattedPhone = phoneNumber.trim();
    if (!formattedPhone.startsWith("+91")) {
      formattedPhone = `+91${formattedPhone}`;
    }

    if (formattedPhone.length !== 13) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await fetch("https://sugar-project.onrender.com/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");

      setIsOtpSent(true);
      setError("");
      setTimer(30);
      setIsResendDisabled(true);
    } catch (error) {
      console.error("❌ Error sending OTP:", error);
      setError(error.message || "Failed to send OTP. Please try again.");
    }
  };
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Enter a valid 6-digit OTP");
      return;
    }
    
    if (!phoneNumber) {
      setError("Phone number is missing. Try resending OTP.");
      return;
    }
    
    console.log("📨 Sending Verify OTP Request", { phoneNumber, otp });
    
    try {
      const response = await fetch("https://sugar-project.onrender.com/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });
  
      const data = await response.json();
      console.log("✅ Server Response:", data);
      
      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }
  
      if (data.message === "OTP verified successfully.") {
        alert("Login successful!");
        setIsLoggedIn(true);
        closeModal();
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("❌ Error verifying OTP:", err);
      setError(err.message || "Error verifying OTP. Please try again.");
    }
  };


  const handleResendOtp = () => {
    setOtp("");
    setTimer(30);
    setIsResendDisabled(true);
    sendOtp();
  };

  return (
    <div className="font-sans">
      <button onClick={openModal} className="text-gray-800 hover:text-pink-500 transition duration-200">
        <User size={25} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg max-w-lg w-full p-10 shadow-lg">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={28} />
            </button>

            {!isOtpSent ? (
              <>
                <div className="p-6">
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                  {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                  <button onClick={sendOtp} className="w-full bg-pink-400 text-white py-3 rounded-lg hover:bg-purple-400">
                    WhatsApp Login
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter OTP</h2>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 text-lg mb-2"
                  />
                  <p className="text-gray-600 text-sm mb-2">OTP expires in: {timer}s</p>
                  {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                  <button onClick={verifyOtp} className="w-full bg-pink-400 text-white rounded-md p-3 mt-2 hover:bg-purple-400">
                    Verify OTP
                  </button>
                  <button
                    onClick={handleResendOtp}
                    disabled={isResendDisabled}
                    className={`w-full text-white rounded-md p-3 mt-2 ${
                      isResendDisabled ? "bg-gray-400 opacity-50" : "bg-pink-400 hover:bg-purple-400"
                    }`}
                  >
                    Resend OTP
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsappLogin;
