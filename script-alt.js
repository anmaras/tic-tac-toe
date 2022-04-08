/* Array & Array win combo */
const arrayControls = (function () {
  const array = [];
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return { array, winCombos };
})();

/* Dom Objects */
const domObjects = (function () {
  const cells = document.querySelectorAll(".grid-item");
  const restart = document.querySelector(".restart-btn");
  return { cells, restart };
})();

/* Dom Object BG & Text Color */
const domObjectsColors = (function () {
  const cellBgColor = "Red";
  const cellTextColor = "White";
  return { cellBgColor, cellTextColor };
})();

/* Players */
const players = (function () {
  const playerX = "X";
  const playerO = "O";
  const defaultPlayer = playerX;
  return { playerX, playerO, defaultPlayer };
})();

/* this refer to the object that i create (arrow wont work) */
const gamePlayModule = (() => {
  /* Public Function */
  function playerChoice() {
    if (!arrayControls.array[this.id]) {
      arrayControls.array[this.id] = players.defaultPlayer;
      this.textContent = players.defaultPlayer;
      players.defaultPlayer =
        players.defaultPlayer == players.playerX
          ? players.playerO
          : players.playerX;
    }
    _winCondition(this.textContent);
  }
  /* Private Function */
  function _winCondition(textContent) {
    for (const condition of arrayControls.winCombos) {
      const [a, b, c] = condition;
      if (
        arrayControls.array[a] === textContent &&
        arrayControls.array[b] === textContent &&
        arrayControls.array[c] === textContent
      ) {
        const winArray = [a, b, c];
        console.log(winArray);
      }
    }
  }

  /* Public Function */
  function restartGame() {
    arrayControls.array.length = 0;
    domObjects.cells.forEach((cell) => (cell.textContent = ""));
    players.defaultPlayer = players.playerX;
  }

  return { playerChoice, restartGame };
})();
/* 
function checkWinCombinations() {
  const winCondition = function () {
    for (const condition of this.winCombinationArray) {
      const [a, b, c] = condition;
      if (
        this.array[a] === this.textContent &&
        this.array[b] === this.textContent &&
        this.array[c] === this.textContent
      ) {
        const winArray = [a, b, c];
        winArray.map(
          (box) => (
            (this.cells[box].style.background = this.cellBgColor),
            (this.cells[box].style.color = this.cellTextColor)
          )
        );
      }
      if (this.array.every((cell) => cell != null)) {
        return alert("DRAW");
      }
    }
  };
  return { winCondition };
} */
/* 
const gameStart = Object.assign(
  {},
  gameBoardArray(),
  gamePlayers("X", "O"),
  gamePlay(),
  checkWinCombinations(),
  displayControls()
); */

/* This refers to the grid object arrow wont work */
/* const gameStartHandler = function () {
  gameStart.playerChoice(this.id);
  gameStart.winCondition();
  this.textContent = gameStart.textContent;
}; */

/* Events modules */

document
  .querySelectorAll(".grid-item")
  .forEach((cell) =>
    cell.addEventListener("click", gamePlayModule.playerChoice)
  );

document
  .querySelector(".restart-btn")
  .addEventListener("click", gamePlayModule.restartGame);
