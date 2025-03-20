document.addEventListener('DOMContentLoaded', () => {
            const playerForm = document.getElementById('player-form');
            const gameBoard = document.getElementById('game');
            const submitBtn = document.getElementById('submit');
            const messageDiv = document.querySelector('.message');
            const cells = document.querySelectorAll('.cell');
            
            let players = {
                player1: '',
                player2: ''
            };
            
            let currentPlayer = 'player1';
            let gameState = ['', '', '', '', '', '', '', '', ''];
            let gameActive = false;
            
            const winningConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6]             // diagonals
            ];
            
            submitBtn.addEventListener('click', () => {
                const player1Name = document.getElementById('player-1').value.trim();
                const player2Name = document.getElementById('player-2').value.trim();
                
                if (player1Name && player2Name) {
                    players.player1 = player1Name;
                    players.player2 = player2Name;
                    
                    playerForm.classList.add('hidden');
                    gameBoard.classList.remove('hidden');
                    gameActive = true;
                    
                    updateMessage();
                }
            });
            
            function updateMessage() {
                const currentPlayerName = currentPlayer === 'player1' ? players.player1 : players.player2;
                messageDiv.textContent = `${currentPlayerName}, you're up`;
            }
            
            function handleCellClick(clickedCellEvent) {
                const clickedCell = clickedCellEvent.target;
                const clickedCellIndex = parseInt(clickedCell.id) - 1;
                
                if (gameState[clickedCellIndex] !== '' || !gameActive) {
                    return;
                }
                
                gameState[clickedCellIndex] = currentPlayer === 'player1' ? 'X' : 'O';
                clickedCell.textContent = gameState[clickedCellIndex];
                
                checkResult();
            }
            
            function checkResult() {
                let roundWon = false;
                
                for (let i = 0; i < winningConditions.length; i++) {
                    const [a, b, c] = winningConditions[i];
                    const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
                    
                    if (condition) {
                        roundWon = true;
                        break;
                    }
                }
                
                if (roundWon) {
                    const winner = currentPlayer === 'player1' ? players.player1 : players.player2;
                    messageDiv.textContent = `${winner} congratulations you won!`;
                    gameActive = false;
                    return;
                }
                
                const roundDraw = !gameState.includes('');
                if (roundDraw) {
                    messageDiv.textContent = 'Game ended in a draw!';
                    gameActive = false;
                    return;
                }
                
                currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
                updateMessage();
            }
            
            cells.forEach(cell => {
                cell.addEventListener('click', handleCellClick);
            });
        });