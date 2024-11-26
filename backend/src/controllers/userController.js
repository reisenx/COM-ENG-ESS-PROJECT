import User from "../models/userModel.js";

// Handle user login and registration
export const handleUser = async (req, res) => {
  console.log("=== Debug Info ===");
  console.log("1. Raw Body:", req.body);
  console.log("2. Content-Type:", req.headers["content-type"]);
  console.log("3. Action Type:", typeof req.body.action);
  console.log("4. Action Value:", req.body.action);
  console.log("================");

  const { username, action, message } = req.body;

  // Log the extracted values
  console.log("Extracted values:", { username, action, message });

  try {
    // Basic validation
    if (!username || !action) {
      console.log("Validation failed:", { username, action });
      return res.status(400).json({
        message: "Missing required fields",
        received: { username, action },
      });
    }

    // Action validation
    const validActions = ["register", "login", "game"];
    if (!validActions.includes(action)) {
      console.log("Invalid action:", action);
      return res.status(400).json({
        message: "Invalid action",
        received: action,
        valid: validActions,
      });
    }

    if (action === "register") {
      // Handle register
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const user = new User({ username });
      await user.save();
      return res.status(201).json({ message: "User registered successfully" });
    }

    if (action === "login") {
      // Handle login
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "Login successful" });
    }

    if (action === "game") {
      console.log("Processing game action");
      console.log("Message:", message);

      // Validate game message
      const validMessages = ["win", "lose", "draw"];
      if (!validMessages.includes(message)) {
        console.error("Invalid game message:", message);
        return res.status(400).json({
          message: "Invalid game message",
          received: message,
          valid: validMessages,
        });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update score
      switch (message) {
        case "win":
          user.score += 100 + user.consecutiveWins * 10;
          user.consecutiveWins += 1;
          break;
        case "lose":
          user.score -= 50;
          user.consecutiveWins = 0;
          break;
        case "draw":
          user.consecutiveWins = 0;
          break;
      }

      await user.save();
      return res.status(200).json({
        message: "Game result recorded",
        newScore: user.score,
      });
    }

    // If we get here, something went wrong
    return res.status(400).json({ message: "Invalid action" });
  } catch (error) {
    console.error("Error in handleUser:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.query.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};

export const getLeaderboardData = async (req, res) => {
  try {
    // Call getUserData to get all users
    const users = await User.find();

    // Filter the results to include only username and score
    const leaderboard = users
      .map((user) => ({
        username: user.username,
        score: user.score,
      }))
      .sort((a, b) => b.score - a.score);

    res.status(200).json({
      status: "success",
      data: {
        entries: leaderboard,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard data" });
  }
};
