import { loginUser, registerUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("LoginButton");
  const registerButton = document.getElementById("RegisterButton");
  const usernameInput = document.getElementById("username_");
  const loginResponse = document.querySelector(".loginResponse h3");

  loginButton.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    try {
      await loginUser(username);
      window.location.href = "home.html";
    } catch (error) {
      loginResponse.textContent = "Please register your account first";
      loginResponse.style.visibility = "visible";
    }
  });

  registerButton.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    try {
      await registerUser(username);
      loginResponse.textContent = "Account created. Please login.";
      loginResponse.style.visibility = "visible";
    } catch (error) {
      loginResponse.textContent = "The username has already been used";
      loginResponse.style.visibility = "visible";
    }
  });
});
