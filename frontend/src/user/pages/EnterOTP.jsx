import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const EnterOTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Retrieve the email stored in localStorage
  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp && email) {
      try {
        // Send POST request to backend to verify OTP along with email
        const response = await axios.post(
          "http://localhost:5000/api/password/verify-otp",
          { otp, email } // Include both OTP and email in the request
        );

        // If OTP is verified successfully, navigate to reset password page
        if (response.status === 200) {
          alert(response.data.message); // Display success message from backend
          navigate("/reset-password"); // Navigate to reset password page
        }
      } catch (error) {
        // Handle any errors (e.g., invalid OTP)
        alert(error.response?.data?.error || "Failed to verify OTP");
      }
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
