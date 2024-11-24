import { getUserData } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const welcomeUserSpan = document.getElementById("welcomeUser");
  const totalScoreSpan = document.getElementById("totalScore");

  const username = localStorage.getItem("username"); // Retrieve username from local storage
  console.log("Retrieved username from local storage:", username); // Debug log

  if (username) {
    try {
      const userData = await getUserData(username); // Pass username to getUserData
      console.log("Fetched user data:", userData); // Debug log

      // Find the user object that matches the username
      const user = userData.find((user) => user.username === username);
      console.log("Fetched user data:", user); // Debug log

      welcomeUserSpan.textContent += user.username;
      totalScoreSpan.textContent += user.score;
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  } else {
    console.error("No username found in local storage");
  }
});
