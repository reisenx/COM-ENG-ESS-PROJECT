const leaderboardList = document.getElementById("leaderboard-list");

// Example data for the leaderboard
const players = [
  { name: "Player1", score: 150 },
  { name: "Player2", score: 140 },
  { name: "Player3", score: 130 },
  { name: "Player4", score: 120 },
  { name: "Player5", score: 110 },
  { name: "Player6", score: 100 },
  { name: "Player7", score: 90 },
  { name: "Player8", score: 11 },
  { name: "Player9", score: 111 },
  { name: "Player10", score: 333 },
  { name: "Player11", score: 110 },
  { name: "Player12", score: 100 },
  { name: "Player13", score: 90 },
];

// Current user data
const currentUser = { name: "You", score: 115 };

// Sort players by score in descending order
players.sort((a, b) => b.score - a.score);

// Find the rank of the current user
const userRank =
  players.findIndex((player) => player.score <= currentUser.score) + 1;

// Insert the current user into the leaderboard if not already there
if (!players.some((player) => player.name === currentUser.name)) {
  players.push(currentUser);
}

// Sort again to ensure the rank is correct
players.sort((a, b) => b.score - a.score);

// Number of top players to display
const topN = 4;

// Display top N players
players.slice(0, topN).forEach((player, index) => {
  const listItem = document.createElement("li");
  listItem.textContent = `#${index + 1} ${player.name} - ${player.score} pts`;
  if (player.name === currentUser.name) {
    listItem.classList.add("current-user"); // Highlight current user in top N
  }
  leaderboardList.appendChild(listItem);
});

// Display the current user's rank and score if not in the top N
if (userRank > topN) {
  const ellipsisItem = document.createElement("li");
  ellipsisItem.textContent = `...`;
  ellipsisItem.classList.add("ellipsis"); // Add ellipsis class
  leaderboardList.appendChild(ellipsisItem);

  const userRankItem = document.createElement("li");
  userRankItem.textContent = `#${userRank} ${currentUser.name} - ${currentUser.score} pts`;
  userRankItem.classList.add("current-user"); // Add current-user class
  leaderboardList.appendChild(userRankItem);
}
