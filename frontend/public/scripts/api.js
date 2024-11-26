import { BACKEND_URL } from "./config.js"; // Adjust the path if necessary

const loginUser = async (username) => {
  try {
    const payload = { username, action: "login" };
    console.log("Sending login with payload:", payload);
    
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("Login response status:", response.status);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    
    console.log("Login successful", data);
    return data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

const registerUser = async (username) => {
  try {
    const payload = { username, action: "register" };
    console.log("Sending register with payload:", payload);
    
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("Register response status:", response.status);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    
    console.log("Registration successful", data);
    return data;
  } catch (error) {
    console.error("Error registering", error);
    throw error;
  }
};

const getUserData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

const getLeaderboardData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error fetching leaderboard data", error);
    throw error;
  }
};

const sendGameResult = async (username, message) => {
  try {
    let normalizedMessage = message;
    switch (message) {
      case "It's a tie!":
        normalizedMessage = "It's a draw!";
        break;
      case "You win!":
        normalizedMessage = "You win!";
        break;
      case "You lose!":
        normalizedMessage = "You lose!";
        break;
      default:
        console.error("Unexpected message:", message);
        throw new Error("Invalid message format");
    }

    const payload = { 
      username, 
      message: normalizedMessage, 
      action: "game"
    };
    console.log("Sending game result with payload:", payload);
    console.log("To URL:", `${BACKEND_URL}/users`);
    
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);
    
    if (!response.ok) {
      console.error("Server response:", data);
      throw new Error(JSON.stringify(data));
    }

    console.log("Game result sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending game result:", error);
    throw error;
  }
};

export {
  getLeaderboardData,
  getUserData,
  loginUser,
  registerUser,
  sendGameResult,
};

