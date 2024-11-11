// src/components/Sidebar.js
import React from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaHistory,
  FaUsers,
  FaSignOutAlt,
  FaCaretDown  ,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user session or data
    localStorage.removeItem("user"); // Remove user data if stored
    navigate("/admin/adminlogin"); // Navigate to the login page
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar">SD</div>
        <h2>Sonam Dorji</h2>
      </div>
      <ul className="menu">
        <li className={location.pathname === "/admin/admindashboard" ? "active" : ""}>
          <Link to="/admin/admindashboard">
            <FaTachometerAlt className="icon" />
            Dashboard
          </Link>
        </li>
        <li className={location.pathname === "/admin/productManager" ? "active" : ""}>
          <Link to="/admin/productManager">
            <FaBox className="icon" />
            Product Manager
          </Link>
        </li>
        <li className="order">
  <li>
    <Link to="">
      <FaCaretDown   className="icon" />
      <span>Order Manager</span> {/* Added a span for better styling control */}
    </Link>
  </li>
  <ul className="ordersub">
    <li className={location.pathname === "/admin/orderindelivery" ? "active" : ""}>
      <Link to="/admin/orderindelivery">
        <FaShoppingCart className="icon" />
        <span>Order in Delivery</span>
      </Link>
    </li>
    <li className={location.pathname === "/admin/orderHistory" ? "active" : ""}>
      <Link to="/admin/orderHistory">
        <FaHistory className="icon" />
        <span>Order History</span>
      </Link>
    </li>
  </ul>
</li>

        <li className={location.pathname === "/admin/userManager" ? "active" : ""}>
          <Link to="/admin/userManager">
            <FaUsers className="icon" />
            User Manager
          </Link>
        </li>
        <li className={location.pathname === "/logout" ? "active" : ""}>
          <Link to="#" onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
