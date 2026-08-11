const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const couponRoute = require("./routes/coupon.route");
const paymentRoute = require("./routes/payment.route");
const analyticsRoute = require("./routes/analytics.route");

const { connectDB } = require("./db/config");

dotenv.config();

const app = express();

app.use(express.json({ limit: "15mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/coupons", couponRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/analytics", analyticsRoute);

app.get("/api/seed", async (req, res) => {
  try {
    const Product = require("./models/product.model");
    const fs = require("fs");
    const path = require("path");
    const productsPath = path.join(__dirname, "../products.json");
    if (fs.existsSync(productsPath)) {
      const productsData = JSON.parse(fs.readFileSync(productsPath, "utf8"));
      await Product.deleteMany({}); // Clear existing to ensure fresh start
      await Product.insertMany(productsData);
      const featuredCount = await Product.countDocuments({ isFeatured: true });
      let redisCleared = false;
      try {
        const redis = require("./lib/redis");
        await redis.del("featured_products");
        redisCleared = true;
      } catch (redisError) {
        console.error("Redis error:", redisError.message);
      }
      res.status(200).json({ 
        success: true, 
        message: "Database seeded successfully!", 
        featuredCount,
        redisCleared 
      });
    } else {
      res.status(404).json({ success: false, message: "products.json not found at " + productsPath });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
