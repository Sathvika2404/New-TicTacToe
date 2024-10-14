let currentPlayer = 'X'; // Start with Player 1
let gameActive = true; // Variable to track if the game is still active
const gameStatus = document.getElementById('game-status');
const cells = document.querySelectorAll('.cell');
let aiEnabled = true;  // Enable AI by default for Player O

function aiMove() {
  let availableCells = [...cells].filter(cell => cell.textContent === '');
  if (availableCells.length > 0) {
    let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.textContent = 'O';  // AI plays 'O'
    checkForWinner();
    if (gameActive) {
      currentPlayer = 'X';  // Switch back to Player X only if game is still active
      gameStatus.textContent = `Player 1 (X) is playing`;
    }
  }
}

// Dark mode toggle
const toggleDarkMode = document.getElementById('dark-mode-btn');
toggleDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  cells.forEach(cell => cell.classList.toggle('dark-mode'));
  document.getElementById('reset-btn').classList.toggle('dark-mode');
  toggleDarkMode.classList.toggle('dark-mode');
});

// Handle cell clicks and AI moves
function handleCellClick() {
  if (this.textContent === '' && gameActive) {
    this.textContent = currentPlayer;  // Player X move
    checkForWinner();
    
    if (gameActive && currentPlayer === 'X' && aiEnabled) {
      currentPlayer = 'O';  // Switch to AI turn
      gameStatus.textContent = `Player 2 (O) is playing`; 
      setTimeout(aiMove, 500);  // Delay AI move slightly for realism
    } else if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Switch player for human opponent
      gameStatus.textContent = `Player ${currentPlayer === 'X' ? '1 (X)' : '2 (O)'} is playing`;
    }
  }
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick); // Add click event listener to each cell
});

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

let scoreX = 0;
let scoreO = 0;

function checkForWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      gameStatus.textContent = `${cells[a].textContent} wins!`;
      document.body.style.backgroundColor = '#ffeb3b'; // Celebratory background
      [cells[a], cells[b], cells[c]].forEach(cell => cell.style.backgroundColor = '#90ee90'); // Highlight winning cells
      
      // Update score
      if (cells[a].textContent === 'X') {
        scoreX++;
        document.getElementById('scoreX').textContent = scoreX;
      } else {
        scoreO++;
        document.getElementById('scoreO').textContent = scoreO;
      }

      gameActive = false;  // Stop the game if there's a winner
      return;
    }
  }

  // Check for draw
  if ([...cells].every(cell => cell.textContent !== '')) {
    gameStatus.textContent = "It's a draw!";
    gameActive = false;
  }
}

// Reset game function
function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';  // Clear the content of all cells
    cell.style.backgroundColor = ''; // Clear the background color for all cells
  });
  currentPlayer = 'X'; // Reset to Player 1
  gameActive = true; // Reactivate the game
  gameStatus.textContent = 'Player 1 (X) is playing'; // Reset status
  
  document.body.style.backgroundColor = '#f5f5f5'; // Reset the background color to default
}

document.getElementById('reset-btn').addEventListener('click', resetGame);  // Add event listener for reset button
