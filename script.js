let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

function startGame() {
    player1 = document.getElementById("player-1").value.trim();
    player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
    }

    document.querySelector(".player-input").style.display = "none";
    document.querySelector(".game-container").style.display = "block";
    
    document.querySelector(".message").innerText = `${player1}, you're up!`;
    gameActive = true;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", handleMove);
    });
}

function handleMove(event) {
    let cell = event.target;
    let cellIndex = parseInt(cell.id) - 1;

    if (!gameActive || gameBoard[cellIndex] !== "") return;

    gameBoard[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWinner()) {
        document.querySelector(".message").innerText = 
            `${currentPlayer === "X" ? player1 : player2}, congratulations! You won! 🎉`;
        gameActive = false;
        return;
    }

    if (!gameBoard.includes("")) {
        document.querySelector(".message").innerText = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.querySelector(".message").innerText = 
        `${currentPlayer === "X" ? player1 : player2}, you're up!`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    return winPatterns.some(pattern => 
        gameBoard[pattern[0]] !== "" &&
        gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
        gameBoard[pattern[1]] === gameBoard[pattern[2]]
    );
}