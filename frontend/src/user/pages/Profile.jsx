import React, { useState, useContext, useEffect } from "react";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { AuthContext } from "../../AuthContext";
import profileImagePlaceholder from "../../assets/images/rose.png";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming you're using axios for API calls

const Profile = () => {
  const { logout, user } = useContext(AuthContext); // Assuming you have user context or JWT token
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({
    profileImage: profileImagePlaceholder,
    username: "",
    email: "",
    password: "", // Password should be stored in the backend securely
  });

  // Fetch user data when component mounts
  useEffect(() => {
    // API call to fetch logged-in user's data
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          // API endpoint
          headers: { Authorization: `Bearer ${user.token}` }, // Assuming user token is stored in context
        });
        setUserData({
          ...response.data,
          profileImage: response.data.profileImage || profileImagePlaceholder,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user.token]);

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
    navigate("/");
  };

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await axios.post(
          "/api/user/update-profile-picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserData({ ...userData, profileImage: response.data.profileImage });
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white w-[900px] rounded-lg shadow-md p-10 relative">
        {/* Edit Profile Button */}
        <button
          onClick={toggleEditProfile}
          className="absolute top-4 right-6 text-[#ff8f52] px-4 py-2 rounded font-semibold"
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
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
                    onChange={handleProfilePicChange}
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
              <label className="block text-gray-700 font-semibold mb-1">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full border ${
                  isEditing ? "border-blue-500" : "border-gray-300"
                } px-4 py-2 rounded`}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full border ${
                  isEditing ? "border-blue-500" : "border-gray-300"
                } px-4 py-2 rounded`}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password:
              </label>
              <div className="flex items-center">
                <input
                  type="password"
                  value="********" // Masked password
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
          <h2 style={{ fontWeight: "bold" }}>Order Status</h2>
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
                <td className="border border-gray-300 px-4 py-2">
                  Sonam Dorji
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  13:01-05-09-2024
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href="#">Check Order</a>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="order-status">Order Paid</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white py-1 px-4 rounded">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          closeModal={() => setShowChangePasswordModal(false)}
        />
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <p>You have been logged out</p>
            <button onClick={handleCloseLogoutModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
