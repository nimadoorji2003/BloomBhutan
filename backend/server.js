// backend/server.js
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://10.9.88.217:${PORT}`);
});
