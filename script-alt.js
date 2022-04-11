/* Array & Array win combo */
const arrayControls = (function () {
  const array = Array(9).fill(null);
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

/* this refer to the object that i create */
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
        _changeStyleOnWin([a, b, c]);
      }
      _checkDrawCondition();
      break;
    }
  }

  /* Private Function  for draw condition*/
  function _checkDrawCondition() {
    if (arrayControls.array.every((cell) => cell != null)) {
      console.log("Draw");
    }
  }

  /* Private Function for grid cell bg clr change on win*/
  function _changeStyleOnWin(winArray) {
    if (winArray) {
      winArray.forEach(
        (value) => (domObjects.cells[value].style.background = "red")
      );
    }
    return;
  }

  /* Public Function */
  function restartGame() {
    arrayControls.array.fill(null);
    domObjects.cells.forEach((cell) => (cell.textContent = ""));
    players.defaultPlayer = players.playerX;
  }

  return { playerChoice, restartGame };
})();

document
  .querySelectorAll(".grid-item")
  .forEach((cell) =>
    cell.addEventListener("click", gamePlayModule.playerChoice)
  );

document
  .querySelector(".restart-btn")
  .addEventListener("click", gamePlayModule.restartGame);
