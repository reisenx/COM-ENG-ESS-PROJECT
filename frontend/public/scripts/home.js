import { getUserData } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const welcomeUserSpan = document.getElementById("welcomeUser");
  const totalScoreSpan = document.getElementById("totalScore");

  try {
    const userData = await getUserData();
    welcomeUserSpan.textContent += userData.username;
    totalScoreSpan.textContent += userData.score;
  } catch (error) {
    console.error("Error fetching user data", error);
  }
});
