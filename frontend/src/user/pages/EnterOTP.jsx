import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterOTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      // Add logic to validate OTP
      alert("OTP validated successfully");
      navigate("/reset-password");
    } else {
      alert("Please enter the OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default EnterOTP;
