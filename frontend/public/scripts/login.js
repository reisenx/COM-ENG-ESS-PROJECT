import { loginUser, registerUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("LoginButton");
  const registerButton = document.getElementById("RegisterButton");
  const usernameInput = document.getElementById("username_");
  const loginResponse = document.querySelector(".loginResponse h3");

  loginButton.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    console.log("Username entered for login:", username); // Debug log
    if (username) {
      try {
        await loginUser(username);
        localStorage.setItem("username", username); // Store username in local storage
        console.log("Username stored in local storage:", username); // Debug log
        window.location.href = "home.html";
      } catch (error) {
        loginResponse.textContent = "Please register your account first";
        loginResponse.style.visibility = "visible";
      }
    } else {
      loginResponse.textContent = "Username cannot be empty";
      loginResponse.style.visibility = "visible";
    }
  });

  registerButton.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    console.log("Username entered for registration:", username); // Debug log
    if (username) {
      try {
        await registerUser(username);
        loginResponse.textContent = "Account created. Please login.";
        loginResponse.style.visibility = "visible";
      } catch (error) {
        loginResponse.textContent = "The username has already been used";
        loginResponse.style.visibility = "visible";
      }
    } else {
      loginResponse.textContent = "Username cannot be empty";
      loginResponse.style.visibility = "visible";
    }
  });
});
