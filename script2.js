const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""]; // Tracks cell states
let isGameActive = true;

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = cell.getAttribute('data-index');

  if (gameState[cellIndex] !== "" || !isGameActive) {
    return;
  }

  // Update game state and UI
  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    statusMessage.textContent = $`{currentPlayer} wins!`;
    isGameActive = false;
  } else if (!gameState.includes("")) {
    statusMessage.textContent = "It's a draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = $`{currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningConditions.some(condition => {
    return condition.every(index => gameState[index] === currentPlayer);
  });
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = 'X';
  statusMessage.textContent = "X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('taken');
  });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);