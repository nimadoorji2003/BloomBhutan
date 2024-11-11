import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would add logic to send OTP to email
      alert("OTP sent to your email");
      navigate("/enter-otp");
    } else {
      alert("Please enter a valid email");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
