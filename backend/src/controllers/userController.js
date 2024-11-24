const User = require("../models/userModel");

// Register a new user
const registerUser = async (req, res) => {
  const { username } = req.body;

  try {
    // Check for duplicate username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// Play the game
const playGame = async (req, res) => {
  const { username, choice } = req.body; // `choice` is rock/paper/scissors
  const botChoices = ["rock", "paper", "scissors"];
  const botChoice = botChoices[Math.floor(Math.random() * 3)];

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let result = "";
    if (
      (choice === "rock" && botChoice === "scissors") ||
      (choice === "paper" && botChoice === "rock") ||
      (choice === "scissors" && botChoice === "paper")
    ) {
      user.consecutiveWins += 1;
      user.score += 100 + (user.consecutiveWins - 1) * 10;
      result = "win";
    } else if (choice === botChoice) {
      result = "draw";
    } else {
      user.consecutiveWins = 0;
      user.score -= 50;
      result = "lose";
    }

    await user.save();
    res.status(200).json({
      message: `You ${result}!`,
      botChoice,
      score: user.score,
    });
  } catch (error) {
    res.status(500).json({ message: "Error playing game" });
  }
};

// Get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ score: -1 }).limit(10);
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  playGame,
  getLeaderboard,
};
