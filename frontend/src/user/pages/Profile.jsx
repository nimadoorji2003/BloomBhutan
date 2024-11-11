// src/pages/Profile.jsx

import React, { useState, useContext } from 'react';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { AuthContext } from '../../AuthContext';
import profileImagePlaceholder from '../../assets/images/rose.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const [userData, setUserData] = useState({
    profileImage: profileImagePlaceholder,
    username: 'Sonam',
    email: 'anushia@gmail.com',
  });

  // Toggle between edit and view mode
  const toggleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white w-[900px] rounded-lg shadow-md p-10 relative">
        
        {/* Edit Profile Button */}
        <button
          onClick={toggleEditProfile}
          className="absolute top-4 right-6  text-[#ff8f52] px-4 py-2 rounded font-semibold"
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 left-6 text-red-500 text-sm font-semibold"
        >
          Logout
        </button>

        {/* Profile Section */}
        <div className="flex items-center space-x-16">
          {/* Left Side: Profile Image */}
          <div className="flex flex-col items-center w-1/3">
            <div className="relative">
              <img
                src={userData.profileImage || profileImagePlaceholder}
                alt="Profile"
                className="w-40 h-40 rounded-full border border-gray-300 object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setUserData({ ...userData, profileImage: imageUrl });
                      }
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </label>
              )}
            </div>
            <p className="mt-4 text-black text-sm">Profile</p>
          </div>

          {/* Right Side: User Info */}
          <div className="flex flex-col space-y-6 w-2/3">
            {/* Username Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Username:</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full border ${isEditing ? 'border-blue-500' : 'border-gray-300'} px-4 py-2 rounded`}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full border ${isEditing ? 'border-blue-500' : 'border-gray-300'} px-4 py-2 rounded`}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password:</label>
              <div className="flex items-center">
                <input
                  type="password"
                  value={userData.password}
                  readOnly
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 focus:outline-none"
                />
                <button
                  onClick={handleChangePassword}
                  className="ml-4 bg-green-500 text-white px-4 py-2 rounded font-semibold"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Section */}
        <div className="orderstatus mt-10">
          <h2 style={{ fontWeight: 'bold' }}>Order Status</h2>
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Sl.No</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Order</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Sonam Dorji</td>
                <td className="border border-gray-300 px-4 py-2">13:01-05-09-2024</td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href="#" >
                    Check Order
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="order-status">Order Paid</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href="#" >
                    View Order
                  </a>
                  <br />
                  <br />
                  <a href="#" >
                    Change Status
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
          onPasswordChange={(newPassword) => {
            console.log('Password changed to:', newPassword);
            setShowChangePasswordModal(false);
          }}
        />
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Logged Out</h2>
            <p className="mb-4">You have been successfully logged out.</p>
            <button
              onClick={handleCloseLogoutModal}
              className="bg-blue-500 text-white px-4 py-2 rounded font-semibold w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
