// src/components/Navbar.js

import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { AuthContext } from '../../AuthContext';
import profileImage from '../../assets/images/rose.png'; // Placeholder profile image
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close the dropdown if a click or touch occurs outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle logout action from the dropdown
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  // Close the logout confirmation modal
  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
    navigate('/'); // Redirect to guest home page after closing the modal
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-6 py-3 z-50">
      {/* Left Side - Profile */}
      <div className="flex items-center">
        {isAuthenticated ? (
          // Profile Picture with Dropdown for logged-in users
          <div className="relative" ref={dropdownRef}>
            <img
              src={profileImage}
              alt="Profile"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div
                className="absolute mt-2 w-[150px] bg-white border  rounded shadow-md"
                style={{ left: 0 }}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link
                  to="/profile"
                  className="block w-full mx-auto px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Login button for guests
          <Link to="/login">
            <button className="bg-black text-white px-6 py-2 rounded font-semibold">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Middle - Navigation Links */}
      <div className="flex items-center space-x-8 ml-10">
        <Link to="/" className="text-gray-700 hover:text-gray-900 font-regular">
          Home
        </Link>
        <Link to="/florals" className="text-gray-700 hover:text-gray-900 font-regular">
          Florals
        </Link>
        <Link to="/" className="text-xl font-bold font-sans flex items-center">
          <img src={logo} alt="Logo" className="h-13 w-10 mr-2" />
        
        </Link>
        <Link to="/customization" className="text-gray-700 hover:text-gray-900 font-regular">
          Customization
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-regular mr-4">
          Contact
        </Link>
      </div>

      {/* Right Side - Cart or Register */}
      <div className="flex items-center">
        {isAuthenticated ? (
          // Cart icon for logged-in users
          <Link to="/cart" className="relative">
            {/* Cart icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 hover:text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Shopping cart icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h14l-1.68 8H7V13zm0 0H3.6l.4-2H7zm7-4h5M9 9h1.5m4.5 0H16m-4.5 0h3"
              />
            </svg>
            {/* Cart item count */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        ) : (
          // Register button for guests
          <Link to="/register">
            <button className="bg-black text-white px-4 py-2 rounded font-semibold">
              Register
            </button>
          </Link>
        )}
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>
          {/* Modal Content */}
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
    </nav>
  );
};

export default Navbar;
