const mongoose = require("mongoose");
require("dotenv").config();

// Define Schemas (Must match server.js exactly)
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

const Artisan = mongoose.model("Artisan", new mongoose.Schema({
  name: String,
  location: String,
  bio: String,
  badge: String,
  image: String,
  specialties: [String]
}));

// --- Data from your js/data.js ---
const productsData = [
    { name: "Handwoven Jute Bag", price: 25, artisan: "Maya Singh", category: "accessories", region: "india", material: "jute", sustainabilityMetric: "Organic", image: "assets/images/product22.webp", isFairTrade: true, description: "Eco-friendly bag." },
    { name: "Organic Cotton Mat", price: 89, artisan: "Priya Sharma", category: "yoga", region: "india", material: "cotton", sustainabilityMetric: "Organic", image: "assets/images/product2.webp", isFairTrade: true, description: "Sustainable mat." },
    { name: "Wooden Bowl Set", price: 65, artisan: "Carlos Rodriguez", category: "woodwork", region: "colombia", material: "wood", sustainabilityMetric: "Handcrafted", image: "assets/images/product23.webp", isFairTrade: false, description: "Hand-carved wood." },
    { name: "Clay Pottery Vase", price: 45, artisan: "Sarah Thompson", category: "pottery", region: "canada", material: "clay", sustainabilityMetric: "Handcrafted", image: "assets/images/product2.webp", isFairTrade: true, description: "Traditional clay." }
];

const artisansData = [
  {
    name: "Elena Rodriguez",
    location: "Oaxaca, Mexico",
    bio: "Traditional oaxacan pottery artist.",
    badge: "Fair Trade",
    image: "assets/images/artisan1.webp",
    specialties: ["pottery", "ceramics"]
  },
  {
    name: "Aisha Khan",
    location: "Kerala, India",
    bio: "Eco-friendly wellness crafts.",
    badge: "Eco-Friendly",
    image: "assets/images/artisan2.webp",
    specialties: ["yoga", "wellness"]
  }
];

// --- Seeding Logic ---
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/meridian");
    
    // Clear existing data to avoid duplicates
    await Product.deleteMany({});
    await Artisan.deleteMany({});

    // Insert new data
    await Product.insertMany(productsData);
    await Artisan.insertMany(artisansData);

    console.log("✅ Database Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();