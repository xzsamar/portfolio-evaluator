require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

// ✅ Load env variables
dotenv.config();




const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
const profileRoutes = require("./routes/profileroutes");
app.use("/api/profile", profileRoutes);

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});