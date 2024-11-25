import { getLeaderboardData } from "./api.js";

const leaderboardList = document.querySelector("#leaderboard-list");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const players = await getLeaderboardData();
    console.log("Leaderboard data", players);
    // Sort players by score in descending order
    players.sort((a, b) => b.score - a.score);

    // Display all players
    players.forEach((player, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span>${index + 1}</span>
        <span>${player.username}</span>
        <span>${player.score}</span>
      `;
      leaderboardList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching leaderboard data", error);
  }
});
