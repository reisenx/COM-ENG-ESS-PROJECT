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
      welcomeUserSpan.textContent += userData.username;
      totalScoreSpan.textContent += userData.score;
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  } else {
    console.error("No username found in local storage");
  }
});
