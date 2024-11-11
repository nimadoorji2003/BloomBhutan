import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import loginImage from "../../assets/images/login.png"; // Ensure you have the image path correct

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication (replace with real authentication logic)
    if (credentials.email && credentials.password) {
      login();
      navigate("/"); // Redirect to home page after login
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Container */}
      <div className="flex h-[620px] w-[1000px] shadow-lg rounded-lg overflow-hidden">
        {/* Left column: Login form (60%) */}
        <div className="w-3/5 bg-white p-12 flex flex-col justify-center">
          {/* Back to home */}
          <div className="mb-6 flex justify-between">
            <h1 className="text-3xl font-bold mb-2">Login</h1>
            <Link to="/" className="text-orange-500 text-sm flex items-center">
              <span>🏠</span> Back to home
            </Link>
          </div>
          <p className="mb-8 text-gray-600">Login and have more fun</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                required
              />
            </div>

            {/* Remember me and Forgot Password */}
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-gray-600 text-sm">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-orange-500 text-sm">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#ff8f52] text-white px-4 py-2 rounded font-semibold w-full"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <p className="mt-6 text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-500">
              Register
            </Link>
          </p>
        </div>

        {/* Right column: Image (40%) */}
        <div className="w-2/5">
          <img
            src={loginImage}
            alt="Login flower"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
