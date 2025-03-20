let gameState = {
    player1: "",
    player2: "",
    currentPlayer: "x",
    board: Array(9).fill(""),
    active: false
};

const playerInput = document.querySelector(".player-input");
const gameContainer = document.querySelector(".game-container");
const message = document.querySelector(".message");
const boardElement = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");

function startGame() {
    gameState.player1 = document.getElementById("player1").value.trim();
    gameState.player2 = document.getElementById("player2").value.trim();

    if (!gameState.player1 || !gameState.player2) {
        alert("Please enter both player names.");
        return;
    }

    playerInput.style.display = "none";
    gameContainer.style.display = "block";

    resetBoard();
    updateMessage(`${gameState.player1}, you're up`);
    gameState.active = true;
}

function handleMove(event) {
    let cell = event.target;
    let cellIndex = parseInt(cell.id) - 1;

    if (!gameState.active || gameState.board[cellIndex]) return;

    gameState.board[cellIndex] = gameState.currentPlayer;
    cell.textContent = gameState.currentPlayer;

    const winner = checkWinner();
    if (winner) {
        const winningPlayer = winner === "x" ? gameState.player1 : gameState.player2;
        updateMessage(`${winningPlayer}, congratulations you won!`);
        gameState.active = false;
        return;
    }

    if (!gameState.board.includes("")) {
        updateMessage("It's a Draw!");
        gameState.active = false;
        return;
    }

    gameState.currentPlayer = gameState.currentPlayer === "x" ? "o" : "x";
    updateMessage(`${gameState.currentPlayer === "x" ? gameState.player1 : gameState.player2}, you're up!`);
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winPatterns) {
        if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c]) {
            return gameState.board[a]; // Return the winning player ("x" or "o")
        }
    }
    return null; // No winner
}

function resetBoard() {
    gameState.board.fill("");
    gameState.currentPlayer = "x";
    gameState.active = true;

    cells.forEach(cell => cell.textContent = "");
}

function updateMessage(text) {
    message.textContent = text;
}

boardElement.addEventListener("click", handleMove);

// Attach event listener to the form
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    startGame(); // Initialize the game
});