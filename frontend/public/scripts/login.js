document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("LoginButton");
  const registerButton = document.getElementById("RegisterButton");
  const usernameInput = document.getElementById("username_");
  const loginResponse = document.querySelector(".loginResponse h3");

  const existingUsers = ["user1", "user2", "user3"]; // Example existing users

  loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (existingUsers.includes(username)) {
      window.location.href = "home.html";
    } else {
      loginResponse.textContent = "Please register your account first";
      loginResponse.style.visibility = "visible";
    }
  });

  registerButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (existingUsers.includes(username)) {
      loginResponse.textContent = "The username has already used";
      loginResponse.style.visibility = "visible";
    } else {
      existingUsers.push(username);
      loginResponse.textContent = "Account created. Please login.";
      loginResponse.style.visibility = "visible";
    }
  });
});
