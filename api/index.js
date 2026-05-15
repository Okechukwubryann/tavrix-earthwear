const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB safely for Vercel
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("DB Connected");
  } catch (err) {
    console.log("DB ERROR:", err.message);
  }
};

// Run connectDB before every request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Import model
let Product;
try {
  Product = require("./models/Product");
  console.log("Product model loaded");
} catch (err) {
  console.log("Model load error:", err.message);
}

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// For Vercel
module.exports = app;