const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/leaderboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for the leaderboard
const leaderboardSchema = new mongoose.Schema({
  username: String,
  score: Number,
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

// Endpoint to get the leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
