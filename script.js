let array = Array(9).fill(null);
const playerX = "X";
const playerO = "O";
let defaultPlayer = playerX;
const boardCells = document.querySelectorAll(".grid-item");
const restart = document.querySelector(".restart-btn");
const firstPlayerTurn = "Player One Turn";
const secondPlayerTurn = "Player Two Turn";
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

const startGame = () => {
  boardCells.forEach((cell) =>
    cell.addEventListener("click", addEntriesInToGridCell)
  );
};

function addEntriesInToGridCell() {
  if (!array[this.id]) {
    array[this.id] = defaultPlayer;
    this.textContent = defaultPlayer;
    /* assign to variable condition to toggle between X and O */
    defaultPlayer = defaultPlayer == playerX ? playerO : playerX;
  }
  checkWhoIsTheWinnerr(this.textContent);

  const functionValue = checkWhoIsTheWinnerr(this.textContent);

  /* Change the bg of winning boxes */
  if (functionValue) {
    changeWinBoxBg(functionValue);
    removeEventAfterWin();
  } else {
    checkForDraw();
  }
}

/* Check win conditions  */
function checkWhoIsTheWinnerr(symbol) {
  for (const condition of winCombination) {
    /* With the use of array destructoring extract all the first index values from winConbination array
    to a then do the same with the second and then with the third index */
    let [a, b, c] = condition;
    /* using the values from deconstructed array as indexes for main array 
i can check if there is any win condition on the board*/
    if (array[a] === symbol && array[b] === symbol && array[c] === symbol) {
      return [a, b, c];
    }
  }
}

/* Check for Draw */
function checkForDraw() {
  if (array.every((cell) => cell != null)) {
    return alert("DRAW");
  }
}

/* Change the bg of winning boxes */
function changeWinBoxBg(input) {
  const boxArray = input;
  boxArray.map((box) => (boardCells[box].style.background = "red"));
}

function removeEventAfterWin() {
  boardCells.forEach((cell) =>
    cell.removeEventListener("click", addEntriesInToGridCell)
  );
}

/* Refresh the page  */
function restartTheGame() {
  array.fill(null);
  boardCells.forEach(
    (cell) => (
      (cell.textContent = ""),
      ((cell.style.background = ""),
      cell.addEventListener("click", addEntriesInToGridCell))
    )
  );
  defaultPlayer = playerX;
}

restart.addEventListener("click", restartTheGame);

startGame();
