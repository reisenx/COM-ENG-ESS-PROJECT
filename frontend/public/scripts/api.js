import { BACKEND_URL } from "./config.js"; // Adjust the path if necessary

console.log("Backend URL:", BACKEND_URL);

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
    const payload = { 
      username: username.trim(), 
      message: message.trim(),
      action: "game"
    };
    
    console.log("Sending game result with exact payload:", JSON.stringify(payload));
    
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    console.log("Complete response:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries([...response.headers]),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Server error response:", data);
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("Error in sendGameResult:", error);
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

