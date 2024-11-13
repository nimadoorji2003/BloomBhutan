import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Retrieve the email stored in localStorage
  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email not found. Please restart the password reset process.");
      return;
    }

    if (newPassword === confirmPassword) {
      try {
        // Send POST request to backend to reset the password
        const response = await axios.post(
          "http://localhost:5000/api/password/reset-password",
          {
            email,
            newPassword,
            confirmPassword, // Send email, newPassword, and confirmPassword
          }
        );

        // If password reset is successful, navigate to login page
        if (response.status === 200) {
          alert(response.data.message); // Show success message from backend

          // Clear the stored email after resetting the password
          localStorage.removeItem("resetEmail");
          navigate("/login"); // Navigate to login page
        }
      } catch (error) {
        // Handle any errors (e.g., failure in resetting the password)
        alert(error.response?.data?.message || "Failed to reset password");
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
