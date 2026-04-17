
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
const profileroutes = require("./routes/profileroutes");
app.use("/api/profile", profileroutes);

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