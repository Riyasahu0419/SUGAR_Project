// import React, { useState } from 'react';
// import { X, User } from 'lucide-react';

// const WhatsappLogin = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');
  
//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);
  
//   return (
//     <div className="font-sans">
//       {/* User button that triggers the modal */}
//       <button 
//         onClick={openModal}
//         className="text-gray-800 hover:text-pink-500 transition duration-200 hover:cursor-pointer"
//       >
//         <User size={25} />
//       </button>
      
//       {/* Modal overlay */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="relative bg-black rounded-lg  max-w-3xl h-[400px]  overflow-hidden flex">
//             {/* Left Side */}
//             <div className="bg-black text-white p-8 flex flex-col justify-center w-1/2">
//               <div className="flex items-center mb-4">
//                 <span className="bg-white text-black font-bold rounded-full p-2 mr-2">S</span>
//                 <span className="text-xl font-medium tracking-widest text-white mb-4">SUGAR</span>
//                 <div className="ml-auto text-right">
//                   <div className="text-xl">Powered by</div>
//                   <div className="font-medium">Kwik<span className="text-yellow-300 font-medium">⚡</span>Pass</div>
//                 </div>
//               </div>
//               <h2 className="text-2xl font-medium tracking-widest text-white mb-4">Rule the world, one look at a time ;)</h2>
//             </div>
            
//             {/* Right Side */}
//             <div className="bg-white my-8 mx-5  p-6 w-1/2 relative">
//               <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//               <div className="text-center mb-6">
//                 <h2 className="text-3xl font-medium tracking-widest text-gray-600 mb-4">Welcome to SUGAR</h2>
//                 <p className="text-gray-600">Get exciting deals :)</p>
//               </div>
//               <div className="mb-6">
//                 <input
//                   type="text"
//                   placeholder="Phone number"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-4 text-lg"
//                 />
//               </div>
//               <button className="w-full bg-green-500 text-white rounded-md p-4 flex items-center justify-center text-xl">
//                 <span className="mr-2">💬</span> Whatsapp Login
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WhatsappLogin;














import React, { useState } from "react";
import { X, User } from "lucide-react";

const WhatsappLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const sendOtp = async () => {
    const response = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });
    const data = await response.json();
    if (data.success) setIsOtpSent(true);
  };

  const verifyOtp = async () => {
    const response = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, otp }),
    });
    const data = await response.json();
    if (data.success) {
      setIsLoggedIn(true);
      closeModal();
    }
  };

  return (
    <div className="font-sans">
      <button onClick={openModal} className="text-gray-800 hover:text-pink-500 transition duration-200 hover:cursor-pointer">
        <User size={25} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-black rounded-lg max-w-3xl h-[400px] overflow-hidden flex">
            <div className="bg-black text-white p-8 flex flex-col justify-center w-1/2">
              <h2 className="text-2xl font-medium tracking-widest text-white mb-4">Welcome to SUGAR</h2>
            </div>

            <div className="bg-white my-8 mx-5 p-6 w-1/2 relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <X size={28} />
              </button>

              {!isOtpSent ? (
                <>
                  <h2 className="text-3xl font-medium tracking-widest text-gray-600 mb-4">Enter Phone Number</h2>
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-4 text-lg"
                  />
                  <button onClick={sendOtp} className="w-full bg-green-500 text-white rounded-md p-4 mt-4">
                    Send OTP
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-medium tracking-widest text-gray-600 mb-4">Enter OTP</h2>
                  <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-4 text-lg"
                  />
                  <button onClick={verifyOtp} className="w-full bg-blue-500 text-white rounded-md p-4 mt-4">
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isLoggedIn && <div className="text-center text-xl text-green-600 mt-4">🎉 Congratulations! You are logged in.</div>}
    </div>
  );
};

export default WhatsappLogin;
