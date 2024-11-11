// src/components/LoginPromptModal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>
        <p className="mb-4">You need to log in to order items.</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
