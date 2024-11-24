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

  setTimeout(() => {
    clearInterval(animationInterval);

    const computerChoice =
      choicesArray[
        Math.floor((Math.random() * choicesArray.length * 29 * 571) % 3)
      ];
    computerImage.src = `res/${computerChoice}.png`;

    const winner = determineWinner(playerChoice, computerChoice);

    const resultText = `You chose ${playerChoice}, computer chose ${computerChoice}. ${winner}`;
    resultContext.innerHTML = resultText;

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
  return "You Lose!";
}
