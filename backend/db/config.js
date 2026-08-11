const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Product = require("../models/product.model");

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongodb connected: ${conn.connection.host}`);

    // Auto-seed if empty
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("Database is empty. Seeding initial products...");
      const productsPath = path.join(__dirname, "../../products.json");
      if (fs.existsSync(productsPath)) {
        const productsData = JSON.parse(fs.readFileSync(productsPath, "utf8"));
        await Product.insertMany(productsData);
        console.log("Seeding completed successfully!");
      } else {
        console.log("products.json not found, skipping seed.");
      }
    }
  } catch (error) {
    console.log(`Error connecting to mongodb: ${error.message}`);
    process.exit(1);
  }
};
