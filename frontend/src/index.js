import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App"; // Assuming this is the common App.js
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';


// Optional: Create a function to determine whether to render admin or user
const renderApp = () => {
  const path = window.location.pathname;

  if (path.startsWith("/admin")) {
    return <App />; // Admin App component
  } else {
    return <App />; // User App component (the same common App can handle both)
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);