const express = require("express");
const router = express.Router();
const axios = require("axios");

// Import scoring logic
const { calculateScores } = require("../services/scoringService");

// ❌ MongoDB removed temporarily
// const Report = require("../models/Report");

router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;

    console.log("Fetching:", username);

    // 🌐 Fetch from GitHub API
    const userRes = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const repoRes = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    const user = userRes.data;
    const repos = repoRes.data;

    // 🧠 Calculate scores
    const scores = calculateScores(user, repos);

    // 📤 Send response
    res.json({
      user,
      repos,
      scores,
    });

  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;