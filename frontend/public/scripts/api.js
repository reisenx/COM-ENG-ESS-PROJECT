import { BACKEND_URL } from "../config.js";

const loginUser = async (username) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Login successful", data);
      // Handle successful login (e.g., redirect to another page or update UI)
    } else {
      console.error("Login failed", data.message);
      // Handle login failure (e.g., show error message)
    }
  } catch (error) {
    console.error("Error logging in", error);
  }
};

const registerUser = async (username) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Registration successful", data);
      // Handle successful registration (e.g., redirect to another page or update UI)
    } else {
      console.error("Registration failed", data.message);
      // Handle registration failure (e.g., show error message)
    }
  } catch (error) {
    console.error("Error registering", error);
  }
};

document.getElementById("LoginButton").addEventListener("click", () => {
  const username = document.getElementById("username_").value;
  loginUser(username);
});

document.getElementById("RegisterButton").addEventListener("click", () => {
  const username = document.getElementById("username_").value;
  registerUser(username);
});
