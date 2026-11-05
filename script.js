const cells = Array.from(document.querySelectorAll("[data-cell]"));
const statusText = document.getElementById("status-text");
const statusIndicator = document.getElementById("status-indicator");
const scoreXElement = document.getElementById("score-x");
const scoreOElement = document.getElementById("score-o");
const scoreDrawElement = document.getElementById("score-draw");
const scoreCardX = document.getElementById("score-card-x");
const scoreCardO = document.getElementById("score-card-o");
const newGameButton = document.getElementById("new-game");
const resetScoreButton = document.getElementById("reset-score");
const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;
let scores = { X: 0, O: 0, draws: 0 };

function playerName(mark) {
  return mark === "X" ? "Player One" : "Player Two";
}

function updateTurnDisplay() {
  statusText.textContent = `${playerName(currentPlayer)}'s turn`;
  statusIndicator.textContent = currentPlayer === "X" ? "×" : "○";
  statusIndicator.classList.toggle("is-o", currentPlayer === "O");
  statusIndicator.classList.remove("is-done");
  scoreCardX.classList.toggle("is-active", currentPlayer === "X");
  scoreCardO.classList.toggle("is-active", currentPlayer === "O");
}

function findWinningLine() {
  return winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
}

function finishGame(winningLine) {
  gameOver = true;
  cells.forEach((cell) => { cell.disabled = true; });

  if (winningLine) {
    const winner = board[winningLine[0]];
    winningLine.forEach((index) => cells[index].classList.add("is-winning"));
    scores[winner] += 1;
    statusText.textContent = `${playerName(winner)} wins!`;
    statusIndicator.textContent = "★";
    statusIndicator.classList.add("is-done");
    scoreCardX.classList.remove("is-active");
    scoreCardO.classList.remove("is-active");
  } else {
    scores.draws += 1;
    statusText.textContent = "It's a draw! Nice game.";
    statusIndicator.textContent = "=";
    statusIndicator.classList.add("is-done");
    scoreCardX.classList.remove("is-active");
    scoreCardO.classList.remove("is-active");
  }
  updateScoreDisplay();
  newGameButton.focus();
}

function updateScoreDisplay() {
  scoreXElement.textContent = String(scores.X);
  scoreOElement.textContent = String(scores.O);
  scoreDrawElement.textContent = String(scores.draws);
}

function playTurn(event) {
  const index = Number(event.currentTarget.dataset.cell);
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  const cell = cells[index];
  cell.textContent = currentPlayer === "X" ? "×" : "○";
  cell.classList.add(currentPlayer === "X" ? "mark-x" : "mark-o");
  cell.setAttribute("aria-label", `Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}, ${playerName(currentPlayer)}`);
  cell.disabled = true;

  const winningLine = findWinningLine();
  if (winningLine) {
    finishGame(winningLine);
  } else if (board.every(Boolean)) {
    finishGame(null);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnDisplay();
  }
}

function startNewGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("mark-x", "mark-o", "is-winning");
    cell.setAttribute("aria-label", `Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}, empty`);
  });
  updateTurnDisplay();
  cells[0].focus();
}

cells.forEach((cell) => cell.addEventListener("click", playTurn));
newGameButton.addEventListener("click", startNewGame);
resetScoreButton.addEventListener("click", () => {
  scores = { X: 0, O: 0, draws: 0 };
  updateScoreDisplay();
  startNewGame();
});