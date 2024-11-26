import { getUserData, sendGameResult } from "./api.js"; // Import the new method

document.addEventListener("DOMContentLoaded", async () => {
  const usernameSpan = document.getElementById("username");
  const scoreSpan = document.getElementById("score");

  const username = localStorage.getItem("username"); // Retrieve username from local storage
  console.log("Retrieved username from local storage:", username); // Debug log

  if (username) {
    try {
      const userData = await getUserData(username); // Pass username to getUserData
      console.log("Fetched user data:", userData); // Debug log

      // Find the user object that matches the username
      const user = userData.find((user) => user.username === username);
      console.log("Fetched user data:", user); // Debug log

      usernameSpan.textContent = user.username;
      scoreSpan.textContent = user.score;
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  } else {
    console.error("No username found in local storage");
  }
});

const choices = document.querySelectorAll(".choices");
const resultDisplay = document.getElementById("result");
//initial pic
const computerImage = document.createElement("img");
computerImage.src = `res/rock.png`;
computerImage.width = 200;
computerImage.height = 200;
resultDisplay.innerHTML = "";
resultDisplay.appendChild(computerImage);

const resultContext = document.getElementById("result-text");
const choicesArray = ["rock", "paper", "scissors"];
const onProcess = false;
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    disableChoices();
    const playerChoice = choice.getAttribute("id_choice");
    animateComputerChoice(playerChoice);
  });
});

function animateComputerChoice(playerChoice) {
  let animationIndex = 0;
  const animationInterval = setInterval(() => {
    const randomChoice = choicesArray[animationIndex];
    computerImage.src = `res/${randomChoice}.png`;
    animationIndex = (animationIndex + 1) % choicesArray.length;
  }, 50);

  setTimeout(async () => {
    clearInterval(animationInterval);

    const computerChoice =
      choicesArray[
        Math.floor((Math.random() * choicesArray.length * 29 * 571) % 3)
      ];
    computerImage.src = `res/${computerChoice}.png`;

    const winner = determineWinner(playerChoice, computerChoice);

    const resultText = `You chose ${playerChoice}, computer chose ${computerChoice}. ${winner}`;
    resultContext.innerHTML = resultText;

    const username = localStorage.getItem("username"); // Retrieve username from local storage
    if (username) {
      try {
        console.log("About to send game result:", { username, winner });
        await sendGameResult(username, winner);
      } catch (error) {
        console.error("Error sending game result", error);
      }
    } else {
      console.error("No username found in local storage");
    }

    enableChoices();
  }, 1000);
}

function disableChoices() {
  choices.forEach((choice) => {
    choice.disabled = true;
    choice.classList.add("disabled");
  });
}

function enableChoices() {
  choices.forEach((choice) => {
    choice.disabled = false;
    choice.classList.remove("disabled");
  });
}

function determineWinner(player, computer) {
  if (player === computer) {
    return "It's a tie!";
  }
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You win!";
  }
  return "You lose!";
}
