import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  localStorage.setItem("resetEmail", email);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        // Sending POST request to the backend API
        const response = await axios.post(
          "http://localhost:5000/api/password/forgot-password",
          { email }
        );

        // Check if the response is successful
        if (response.status === 200) {
          alert(response.data.message); // Show message from the server
          navigate("/enter-otp"); // Navigate to OTP page
        }
      } catch (error) {
        // Handle error from API request
        alert(error.response?.data?.message || "Something went wrong");
      }
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
