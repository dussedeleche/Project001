const startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", startGame);

const startScreen = document.getElementById("start-screen");
const playButton = document.getElementById("play-btn");

// Add an event listener to the start button

function playGame() {

}

const pads = document.querySelectorAll(".pad");
const gameBoard = document.getElementById("game-board");
const WINNING_ROUNDS = 15; // Number of rounds to win
const openBtn = document.getElementById("open-btn");
const closeBtn = document.querySelector(".close");
const modal = document.getElementById("game-over-modal");
const overlay = document.querySelector(".overlay");
const winModal = document.getElementById("you-win-modal");
const overlay2 = document.querySelector(".overlay2");
const closeWin = document.querySelector(".close-win");
const scoreboard = document.querySelector(".scoreboard");

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.display = "none";
});

closeWin.addEventListener("click", () => {
    winModal.style.display = "none";
    overlay.style.display = "none";
  });

let round = 1;
let patComp = [];
let playerPattern = [];
let turnCounter = 0;
let score = 0

function startGame() {
      // Hide the start screen
      startScreen.style.display = "none";

      // Display the game screen
      const gameScreen = document.getElementById("game-screen");
      gameScreen.style.display = "block";
  computerTurn();
}

function scoreUpdate() {
    scoreboard.textContent = "Score: " + score;

}

function computerTurn() {
  patComp = generateComputerPattern(round);
  console.log("Computer pattern:", patComp);

  // light up each pad in the computer's pattern
  patComp.forEach((color, index) => {
    setTimeout(() => {
      lightUpPad(color);
      if (index === patComp.length - 1) {
        // After the last pad lights up, initiate player's turn
        setTimeout(() => {
          playerTurn();
        }, 500);
      }
    }, index * 1000);
  });
}

function playerTurn() {
  // Enable event listeners for player input
  console.log("playerTurn"); //add message here
  pads.forEach((pad) => {
    pad.addEventListener("click", handlePlayerInput);
  });
}

function handlePlayerInput(e) {
  const selectedColor = e.target.offsetParent.classList[1];
  console.log(selectedColor);
  lightUpPad(selectedColor);
  const index = playerPattern.push(selectedColor) - 1;
  console.log(index);
  turnCounter++;

  if (playerPattern[index] !== patComp[index]) {
    console.log("Wrong pattern. Game over.");
    displayGameOverModal();
    reset();
    return;
  }

  if (turnCounter === patComp.length) {
    if (playerPattern.length === 4) {
      console.log("Player wins!");
      displayGameWinModal();
      reset();
    } //input styling for player win
    comparePattern();
  }
}

function comparePattern() {
  // Compare playerPattern with patComp
  console.log("Player pattern:", playerPattern);

  // Reset for the next round
  round++;
  score++;
  scoreUpdate();
  playerPattern = [];
  turnCounter = 0;

  // Start computer's turn
  setTimeout(() => {
    computerTurn();
  }, 1000); // Wait 1 second before starting computer's turn
}

function lightUpPad(color) {
  const pad = document.querySelector(`#${color}`);
  pad.classList.add("lit");
  setTimeout(() => {
    pad.classList.remove("lit");
  }, 300);
}

function generateComputerPattern(round) {
  const colors = ["pink", "blue", "green", "purple"];
  const pattern = [...patComp];
  pattern.push(colors[Math.floor(Math.random() * colors.length)]);
  return pattern;
}

function displayMessage(message) {
  const overlay = document.querySelector("#winning-screen");
  const messageBox = overlay.querySelector(".message-box");
  //   const messageText = messageBox.querySelector("h2");

  //   messageText.textContent = message;

  // Show the overlay
  overlay.classList.add("show");

  // Add event listener to play again when the overlay is clicked
  overlay.addEventListener("click", () => {
    overlay.classList.remove("show");
    startGame(); // Restart the game
    reset();
  });
}

function reset() {
  round = 1;
  patComp = [];
  playerPattern = [];
  turnCounter = 0;
  score = 0;
}

function displayGameOverModal() {
  modal.style.display = "flex";

  // modal.style.display = "block";
  overlay.style.display = "block";
}

function displayGameWinModal() {
  winModal.style.display = "flex";

  // modal.style.display = "block";
  overlay2.style.display = "block";
}
//next steps
//styling for display messages, score, reset button, computer/ player turn indication

// Make buttons unclickable while buttons are flashing
