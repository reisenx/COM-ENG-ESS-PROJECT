import { BACKEND_URL } from "./config.js"; // Adjust the path if necessary

const loginUser = async (username) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, action: "login" }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Login successful", data);
      // Handle successful login (e.g., redirect to another page or update UI)
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

const registerUser = async (username) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, action: "register" }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Registration successful", data);
      // Handle successful registration (e.g., redirect to another page or update UI)
    } else {
      throw new Error(data.message);
    }
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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("LoginButton").addEventListener("click", () => {
    const username = document.getElementById("username_");
    loginUser(username);
  });

  document.getElementById("RegisterButton").addEventListener("click", () => {
    const username = document.getElementById("username_");
    registerUser(username);
  });
});

export { getUserData, loginUser, registerUser };
