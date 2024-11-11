// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./user/components/Navbar"; // Ensure these components exist
import Footer from "./user/components/Footer";
import Home from "./user/pages/Home";
import Florals from "./user/pages/Florals";
import Customization from "./user/pages/Customization";
import Contact from "./user/pages/Contact";
import ProductDetails from "./user/pages/ProductDetails";
import Cart from "./user/pages/Cart";
import Profile from "./user/pages/Profile";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import ForgotPassword from "./user/pages/ForgotPassword";
import EnterOTP from "./user/pages/EnterOTP";
import ResetPassword from "./user/pages/ResetPassword";
import AdminDashboard from "./admin/components/AdminDashboard";
import OrderInDelivery from "./admin/components/OrderInDelivery";
import UserManager from "./admin/components/UserManager";
import OrderHistory from "./admin/components/OrderHistory";
import ProductManager from "./admin/components/ProductManager";

function App() {
  const location = useLocation(); // Get the current path

  // Check if the current path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin/');

  return (
    <div>
      {!isAdminRoute && <Navbar />}{" "}
      {/* Render Navbar only if not in admin route */}
      <div className={isAdminRoute ? "pt-0" : "pt-16"}>
        {" "}
        {/* Remove padding on admin pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/florals" element={<Florals />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin routes */}
          <Route path="/admin/admindashboard" element={<AdminDashboard />} />
          <Route path="/admin/orderindelivery" element={<OrderInDelivery />} />
          <Route path="/admin/usermanager" element={<UserManager />} />
          <Route path="/admin/orderhistory" element={<OrderHistory />} />
          <Route path="/admin/productmanager" element={<ProductManager />} />
        </Routes>
      </div>
      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />}{" "}
      {/* Render Footer only if not in admin route */}
    </div>
  );
}

export default App;
