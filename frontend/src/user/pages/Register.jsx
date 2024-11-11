// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import registerImage from '../../assets/images/register.png'; // Ensure you have the image path correct

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration (replace with real registration logic)
    if (userDetails.name && userDetails.email && userDetails.password) {
      // Assume registration is successful
      alert('Registration successful! Please log in.');
      navigate('/login'); // Redirect to login page after registration
    } else {
      alert('Please enter valid details.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Container */}
      <div className="flex h-[620px] w-[1000px] shadow-lg rounded-lg overflow-hidden">
        {/* Left column: Registration form (60%) */}
        <div className="w-3/5 bg-white p-12 flex flex-col justify-center">
          {/* Back to home */}
          <div className="mb-6 flex justify-between">
            <h1 className="text-3xl font-bold mb-2">Register</h1>
            <Link to="/" className="text-orange-500 text-sm flex items-center">
              <span>🏠</span> Back to home
            </Link>
          </div>
          <p className="mb-8 text-gray-600">Register and help us help you</p>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                required
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={userDetails.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#ff8f52] text-white px-4 py-2 rounded font-semibold w-full"
            >
              Register
            </button>
          </form>

          {/* Register Agreement */}
          <p className="mt-6 text-gray-600 text-sm">
            With registering you're accepting our{' '}
            <span className="text-orange-500">terms</span> and{' '}
            <span className="text-orange-500">privacy policy</span>
          </p>

          {/* Already have an account */}
          <p className="mt-6 text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500">
              Login
            </Link>
          </p>
        </div>

        {/* Right column: Image (40%) */}
        <div className="w-2/5">
          <img
            src={registerImage}
            alt="Register"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
