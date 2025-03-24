import React, { useState, useEffect } from "react";
import { X, User } from "lucide-react";

const WhatsappLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
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
      setOtp(""); // ✅ Clears OTP input after 30 seconds
    }
    return () => clearInterval(countdown);
  }, [isOtpSent, timer]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setPhone("");
    setOtp("");
    setIsOtpSent(false);
    setError("");
    setTimer(30);
    setIsResendDisabled(true);
  };

  const sendOtp = async () => {
    if (!phone) {
      setError("Phone number is required");
      return;
    }
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      alert("OTP sent successfully!");
      setIsOtpSent(true);
      setTimer(30);
      setIsResendDisabled(true);
    } catch (err) {
      console.log("❌ Error sending OTP:", err);
      setError("Error sending OTP. Please check your connection.");
    }
  };

  const verifyOtp = async () => {
    if (!otp || !phone) {  // ✅ Ensure phone is present
      setError("Phone and OTP are required");
      return;
    }
    setError("");

    console.log("🔹 Sending OTP verification:", { phone, otp: String(otp).trim() });

    try {
      const response = await fetch("http://localhost:5000/api/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: String(otp).trim() }), // ✅ Ensure OTP is properly formatted
      });

      console.log("🔹 Response status:", response.status); // ✅ Log response status

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Server error:", errorData);
        throw new Error(errorData.error || "Network response was not ok");
      }

      const data = await response.json();
      console.log("✅ OTP verified response:", data);

      if (data.token) {
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


  return (
    <div className="font-sans">
      <button onClick={openModal} className="text-gray-800 hover:text-pink-500 transition duration-200 hover:cursor-pointer">
        <User size={25} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg max-w-lg w-full p-6 shadow-lg">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={28} />
            </button>

            {!isOtpSent ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Phone Number</h2>
                <input
                  type="text"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 text-lg mb-2"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button onClick={sendOtp} className="w-full bg-green-500 text-white rounded-md p-3 mt-2">
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter OTP</h2>
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 text-lg mb-2"
                  disabled={timer === 0} // Disable input if timer runs out
                />
                <p className="text-gray-600 text-sm mb-2">OTP expires in: {timer}s</p>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button onClick={verifyOtp} className="w-full bg-blue-500 text-white rounded-md p-3 mt-2">
                  Verify OTP
                </button>
                <button
                  onClick={sendOtp}
                  className={`w-full bg-gray-400 text-white rounded-md p-3 mt-2 ${isResendDisabled ? "opacity-50 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
                  disabled={isResendDisabled}
                >
                  Resend OTP
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsappLogin;
