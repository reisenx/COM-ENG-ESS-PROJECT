import User from "../models/userModel.js";

// Handle user login and registration
export const handleUser = async (req, res) => {
  console.log("Received request to handleUser. Body:", req.body);
  
  const { username, action } = req.body;

  if (!action) {
    console.error("No action provided in request");
    return res.status(400).json({ message: "No action provided" });
  }

  if (!username) {
    console.error("No username provided in request");
    return res.status(400).json({ message: "No username provided" });
  }

  try {
    if (action === "register") {
      console.log("Processing registration for:", username);
      
      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      // Create new user
      const newUser = new User({ username });
      await newUser.save();
      
      console.log("Registration successful for:", username);
      return res.status(201).json({ message: "User registered successfully" });
    }
    // ... rest of the actions ...
  } catch (error) {
    console.error("Error in handleUser:", error);
    return res.status(500).json({ 
      message: "Error handling user request",
      error: error.message 
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

// Play the game
// export const playGame = async (req, res) => {
//   const { username, message, action } = req.body;

//   console.log("Received request to playGame:", req.body); // Add this line for debugging

//   // Check if action is correct
//   if (action !== "playGame") {
//     return res.status(400).json({ message: "Invalid action" });
//   }

//   // Check if message is a string
//   if (typeof message !== "string") {
//     console.error("Invalid message format:", message); // Log the invalid message
//     return res.status(400).json({ message: "Invalid message format" });
//   }

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update the user's score
//     if (message === "You win!") {
//       user.score += 100 + user.consecutiveWins * 10;
//       user.consecutiveWins += 1;
//     }
//     if (message === "You lose!") {
//       user.score -= 100;
//       user.consecutiveWins = 0;
//     }
//     if (message === "It's a draw!") {
//       user.score += 0;
//       user.consecutiveWins = 0;
//     }

//     // Save the updated user to the database
//     await user.save();

//     // Send a success response
//     res.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error playing game" });
//   }
// };
