// src/components/Footer.js
import React from 'react';
import logo from '../../assets/images/logo.png'; // Replace with the correct path to your logo

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-300">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-row items-center gap-2">
          <img src={logo} alt="Bloom Bhutan" className="w-14 h-18 " /> {/* Logo */}
          <h2 className="text-xl font-semibold">Bloom Bhutan</h2>
        </div>

        {/* Links Section */}
        <div className="flex flex-col">
          <h3 className="font-bold mb-4 ">Links</h3>
          <ul className="space-y-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/florals" className="hover:underline">Flora</a></li>
            <li><a href="/customize" className="hover:underline">Customize</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold mb-4">Contact us</h3>
          <p>302/2 Phendey Lam, Thimphu - 11001, Bhutan</p>
          <p>Mobile No: +97577737314</p>
          <p>Telephone No: +975-2-123455</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; Copyright 2024 Bloom Bhutan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
