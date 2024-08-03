import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here
document.addEventListener("DOMContentLoaded", event => {
  startGame();

  const resetButton = document.getElementById("reset");

  resetButton.addEventListener('click', resetGame);


});

const takeTurn = event => {
  event.stopPropagation();

  const cell = event.target;
  const row = cell.getAttribute("data-row");
  const column = cell.getAttribute("data-column");

  const hit = board.makeHit(row, column);
  console.log(hit);

  if (hit) {
    cell.innerHTML = `<p>${hit}</p>`;
    cell.classList.add("hit")
  } else {
    cell.classList.add("miss");
  }

  if (board.isGameOver()) {
    document.getElementById('win-msg').setAttribute("class", "shown")
    disableClicks();
  }
}

const disableClicks = () => {
  const cells = document.querySelectorAll(".cell");
  for (const cell of cells) {
    cell.removeEventListener('click', takeTurn);
  }
}

const addCell = (row, column) => {
  const gameBoard = document.getElementById('game-board');

  const newCell = document.createElement("div");

  newCell.setAttribute("data-row", row);
  newCell.setAttribute("data-column", column);
  newCell.setAttribute("class", "cell");

  newCell.addEventListener('click', takeTurn);

  gameBoard.appendChild(newCell);
}

const startGame = () => {
  for (let r = 0; r < board.grid.length; r++) {
    for (let c = 0; c < board.grid[r].length; c++) {
      addCell(r, c, board.grid[r][c]);
    }
  }
}

const resetGame = event => {
  const gameBoard = document.getElementById('game-board');
  gameBoard.textContent = "";

  event.preventDefault();
  board = new Board();
  startGame();
}
