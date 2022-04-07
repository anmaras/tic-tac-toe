const boardCells = document.querySelectorAll(".grid-item");
const restart = document.querySelector(".restart-btn");
/* make an array with 9 indexes and every index give a value of null */
let array = Array(9).fill(null);

function addPlayerSelection() {
  /* if cell falsy add content */
  if (!this.textContent) this.textContent = toggle();
  playerTurnText();
  createTheGameBoard(this.id);
  checkWin(this.textContent);
  draw();
}

function toggle() {
  const playerX = "X";
  const playerO = "O";
  const defaultPlayer = playerX;
  /* add as content the defaultplayer and for the next selection add playerO and toggle
  between those two */

  return this.textContent === defaultPlayer
    ? (this.textContent = playerO)
    : (this.textContent = playerX);
}

function createTheGameBoard(index) {
  /* if array is null or falsy in the specific index put this.textContent into the specific 
  index */
  if (!array[index]) {
    return (array[index] = this.textContent);
  }
}

/* Depend who is playing change the text of user turn div */
function playerTurnText() {
  const firstPlayerTurn = "Player One Turn";
  const secondPlayerTurn = "Player Two Turn";
  const turns = document.querySelector(".player-turn");

  if (this.textContent) {
    turns.textContent = secondPlayerTurn;
  } else turns.textContent = firstPlayerTurn;
}

/* Check win conditions  */
function checkWin(id) {
  /* Grid id combinations that win the game */
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

  /* Loop through winCombination array  */
  for (const condition of winCombination) {
    /* With the use of array destructoring extract all the first index values from winConbination array
    to a then do the same with the second and then with the third index */
    let [a, b, c] = condition;
    /* using the values from deconstructed array as indexes for main array 
i can check if there is any win condition on the board*/
    if (array[a] === id && array[b] === id && array[c] === id) {
      alert(`The winner is player ${id}`);
      /* Remove event listener from cells after winner announced */
      removeEventAfterWin();
    }
  }
}

function draw() {
  if (array.every((cell) => cell != null)) {
    alert("DRAW");
  }
}

function removeEventAfterWin() {
  boardCells.forEach((cell) =>
    cell.removeEventListener("click", addPlayerSelection)
  );
}

/* Start the game module */
(function addEvent() {
  boardCells.forEach((cell) =>
    cell.addEventListener("click", addPlayerSelection)
  );
})();

/* Refresh the page  */
function refreshPage() {
  window.location.reload();
}

restart.addEventListener("click", refreshPage);
