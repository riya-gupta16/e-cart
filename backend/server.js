const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Razorpay = require("razorpay");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/meridian")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// --- Schemas & Models ---

// 1. User Model
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['customer', 'artisan'], default: 'customer' }
}));

// 2. Product Model
const Product = mongoose.model("Product", new mongoose.Schema({
  name: String,
  price: Number,
  artisan: String,
  category: String,
  region: String,
  material: String,
  sustainabilityMetric: String,
  image: String,
  isFairTrade: Boolean,
  description: String
}));

// 3. Artisan Model (New)
const Artisan = mongoose.model("Artisan", new mongoose.Schema({
  name: String,
  location: String,
  bio: String,
  badge: String,
  image: String,
  specialties: [String]
}));

// --- Payment Instance ---
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- API Routes ---

// AUTH
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await User.create({ name, email, password: hash, role });
    res.status(201).json({ msg: "Registered" });
  } catch (e) { res.status(400).json({ msg: "Email already exists" }); }
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: "Could not add product" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "SECRETKEY");
  res.json({ token, role: user.role, name: user.name });
});

// PRODUCTS
app.get("/api/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

// ARTISANS (New Routes)
app.get("/api/artisans", async (req, res) => {
  try {
    const artisans = await Artisan.find();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch artisans" });
  }
});

// Route for adding artisans (for initial setup/dashboard)
app.post("/api/artisans", async (req, res) => {
  const data = await Artisan.create(req.body);
  res.status(201).json(data);
});

// PAYMENTS
app.post("/api/payment/order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // to paise
    currency: "INR",
    receipt: `order_${Date.now()}`
  };
  const order = await razorpay.orders.create(options);
  res.json(order);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));