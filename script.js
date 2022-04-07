const option = document.querySelectorAll(".option");
const gridItems = document.querySelectorAll(".grid-item");
const boardCells = [...gridItems];
const restart = document.querySelector(".restart-btn");
/* make an array with 9 indexes and every index give a value of null */
let array = Array(9).fill(null);

const playerX = "X";
const playerO = "O";
const defaultPlayer = playerX;

function addPlayerSelection() {
  /* if cell falsy add content */
  if (!this.textContent) this.textContent = toggle();
  playerTurnText();
  createTheGameBoard(this.id);
  checkWin(this.textContent);
}

function toggle() {
  /* add as content the defaultplayer and for the next selection add playerO and toggle
  between those two */

  return this.textContent === defaultPlayer
    ? (this.textContent = playerO)
    : (this.textContent = playerX);
}

function createTheGameBoard(index) {
  if (!array[index]) array[index] = this.textContent;
  console.log(array);
}

function playerTurnText() {
  const turns = document.querySelector(".player-turn");
  const firstPlayerTurn = "Player One Turn";
  const secondPlayerTurn = "Player Two Turn";

  if (this.textContent === defaultPlayer) {
    turns.textContent = secondPlayerTurn;
  } else turns.textContent = firstPlayerTurn;
}

function checkWin(id) {
  const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const condition of winCombination) {
    //array destructoring
    let [a, b, c] = condition;
    if (array[a] === id && array[b] === id && array[c] === id) {
      console.log(`The winner is player ${id}`);
      removeEventAfterWin();
    }
  }
}
function winMsg(player) {
  return console.log(`The winner is player ${player}`);
}

function removeEventAfterWin() {
  boardCells.forEach((cell) =>
    cell.removeEventListener("click", addPlayerSelection)
  );
}

(function addEvent() {
  boardCells.forEach((cell) =>
    cell.addEventListener("click", addPlayerSelection)
  );
})();

function refreshPage() {
  window.location.reload();
}

restart.addEventListener("click", refreshPage);
