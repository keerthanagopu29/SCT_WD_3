let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");

// Create board cells
function initBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.addEventListener("click", handleClick);
    div.textContent = cell;
    boardElement.appendChild(div);
  });
}

// Handle clicks
function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  // Uncomment to play vs computer
  // if (currentPlayer === "O") computerMove();
}

// Computer move (easy AI)
function computerMove() {
  const emptyIndices = board.map((v, i) => v === "" ? i : null).filter(i => i !== null);
  const move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  setTimeout(() => {
    document.querySelectorAll(".cell")[move].click();
  }, 500);
}

// Check winner
function checkWinner(player) {
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === player)
  );
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = `Player X's turn`;
  initBoard();
}

initBoard();
