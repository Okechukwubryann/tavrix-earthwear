let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('DB Connected');
  } catch (err) {
    console.log('DB ERROR:', err.message);
  }
};

connectDB();

require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Debug
console.log("STARTING SERVER...");
console.log("MONGO URI:", process.env.MONGO_URI);

// Import model
let Product;
try {
  Product = require("./models/Product");
  console.log("Product model loaded");
} catch (err) {
  console.log("Model load error:", err.message);
}

// Connect MongoDB safely
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log("DB ERROR:", err.message));
} else {
  console.log("No MONGO_URI found in .env");
}

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('DB Connected'))
.catch(err => console.log('DB ERROR:', err.message));

// For Vercel
module.exports = app;

// For local testing only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}