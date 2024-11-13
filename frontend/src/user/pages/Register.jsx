import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import registerImage from "../../assets/images/register.png"; // Ensure the image path is correct

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", data.token);

        // Redirect based on user role
        if (data.isAdmin) {
          navigate("/admin/admindashboard");
        } else {
          navigate("/login");
        }
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Main Container */}
      <div className="flex h-[620px] w-[1000px] shadow-lg rounded-lg overflow-hidden">
        {/* Left Column: Form */}
        <div className="w-3/5 bg-white p-12 flex flex-col justify-center">
          {/* Header */}
          <div className="mb-6 flex justify-between">
            <h1 className="text-3xl font-bold mb-2">Register</h1>
            <Link to="/" className="text-orange-500 text-sm flex items-center">
              <span>🏠</span> Back to home
            </Link>
          </div>
          <p className="mb-8 text-gray-600">Register and help us help you</p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
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

            {/* Username Input */}
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

            {/* Password Input */}
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
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="mt-4 text-center">
              <p className="text-orange-500">Registering... Please wait.</p>
            </div>
          )}

          {/* Terms and Policy */}
          <p className="mt-6 text-gray-600 text-sm">
            By registering, you accept our{" "}
            <span className="text-orange-500">terms</span> and{" "}
            <span className="text-orange-500">privacy policy</span>.
          </p>

          {/* Redirect to Login */}
          <p className="mt-6 text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500">
              Login
            </Link>
          </p>
        </div>

        {/* Right Column: Image */}
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
