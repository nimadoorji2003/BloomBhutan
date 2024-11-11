const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { sendOTPEmail } = require("../utils/sendMail");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in signup", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in login", error });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpCode = generateToken(8); // Generate 8-digit OTP
    console.log("Generated OTP:", otpCode); // Log OTP for testing (or remove this for production)

    // Save OTP and expiration time in the database
    user.resetOTP = otpCode;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();

    res.json({ message: "OTP generated and saved in the database" });
  } catch (error) {
    console.error("Error in forgotPassword controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    // Find user by email and the provided OTP
    const user = await User.findOne({
      email,
      resetOTP: token, // Verify the provided OTP
      otpExpiresAt: { $gt: Date.now() }, // Check if OTP has not expired
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    // If OTP is valid, reset the password
    user.password = newPassword; // Hash this password before saving if needed
    user.resetOTP = undefined; // Remove OTP and expiration time after successful reset
    user.otpExpiresAt = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in reset password", error });
  }
};
