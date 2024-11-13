// src/pages/Login.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import loginImage from "../../assets/images/login.png";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Used to display error messages
  const [loading, setLoading] = useState(false); // Used to show loading state

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing error
    setLoading(true); // Set loading state

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        login(data);

        if (data.isAdmin) {
          navigate("/admin/admindashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex h-[620px] w-[1000px] shadow-lg rounded-lg overflow-hidden">
        <div className="w-3/5 bg-white p-12 flex flex-col justify-center">
          <div className="mb-6 flex justify-between">
            <h1 className="text-3xl font-bold mb-2">Login</h1>
            <Link to="/" className="text-orange-500 text-sm flex items-center">
              <span>🏠</span> Back to home
            </Link>
          </div>
          <p className="mb-8 text-gray-600">Login and have more fun</p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
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

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-gray-600 text-sm">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-orange-500 text-sm">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-[#ff8f52] text-white px-4 py-2 rounded font-semibold w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-500">
              Register
            </Link>
          </p>
        </div>

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
