import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Add logic to reset password in backend
      alert("Password reset successful!");
      navigate('/login');
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
