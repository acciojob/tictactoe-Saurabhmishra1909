//your JS code here. If required.
let player1, player2;
let currentPlayer;
let board;
let gameActive;

// Initialize the game
function initializeGame() {
  player1 = document.getElementById('player-1').value;
  player2 = document.getElementById('player-2').value;
  currentPlayer = player1;
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  // Hide the form and show the game board
  document.getElementById('form-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';

  // Update the message
  updateMessage(`${currentPlayer}, you're up!`);

  // Add event listeners to cells
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const cellId = cell.id - 1; // Convert id to index (0-8)

  // Check if the cell is already occupied or the game is over
  if (board[cellId] !== '' || !gameActive) {
    return;
  }

  // Update the board and cell
  board[cellId] = currentPlayer === player1 ? 'X' : 'O';
  cell.textContent = board[cellId];

  // Check for a winner
  if (checkWin()) {
    updateMessage(`${currentPlayer}, congratulations! You won!`);
    gameActive = false;
    return;
  }

  // Check for a draw
  if (board.every(cell => cell !== '')) {
    updateMessage(`It's a draw!`);
    gameActive = false;
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  updateMessage(`${currentPlayer}, you're up!`);
}

// Check for a winning condition
function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

// Update the message
function updateMessage(message) {
  document.querySelector('.message').textContent = message;
}

// Attach event listener to the form
document.getElementById('player-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission
  initializeGame(); // Initialize the game
});