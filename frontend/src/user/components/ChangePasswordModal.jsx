// src/components/ChangePasswordModal.js
import React, { useState } from 'react';

const ChangePasswordModal = ({ onClose, onPasswordChange }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Simulated current password (for demonstration purposes)
  const simulatedCurrentPassword = 'password123';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPassword !== simulatedCurrentPassword) {
      setError('Current password is incorrect.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    // Proceed to change the password
    onPasswordChange(newPassword);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              required
            />
          </div>
          {/* New Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              required
            />
          </div>
          {/* Confirm New Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              required
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
