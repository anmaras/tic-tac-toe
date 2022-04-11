/* Array & Array win combo */
const displayControls = (function () {
  const cells = document.querySelectorAll(".grid-item");
  const restart = document.querySelector(".restart-btn");
  const cellWinBgColor = "Red";
  const cellWinTextColor = "White";
  const emptyBoard = Array(9).fill(null);
  const winBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return {
    emptyBoard,
    winBoard,
    cellWinBgColor,
    cellWinTextColor,
    cells,
    restart,
  };
})();

const playerFactory = (name) => {
  return { name };
};

/* Players */
/* const players = (function () {
  const playerX = "X";
  const playerO = "O";
  const defaultPlayer = playerX;
  return { playerX, playerO, defaultPlayer };
})(); */

const gamePlayModule = (() => {
  const personX = playerFactory("X");
  const personO = playerFactory("O");
  const defaultPlayer = playerFactory([personX.name]);
  /* Public Function */
  function playerChoice() {
    if (!displayControls.emptyBoard[this.id]) {
      displayControls.emptyBoard[this.id] = defaultPlayer.name;
      this.textContent = defaultPlayer.name;
      //tenary condition
      defaultPlayer.name =
        defaultPlayer.name == personX.name ? personO.name : personX.name;
    }
    _winCondition(this.textContent);
  }

  /* Private Function */
  function _winCondition(textContent) {
    for (const condition of displayControls.winBoard) {
      const [a, b, c] = condition;
      if (
        displayControls.emptyBoard[a] === textContent &&
        displayControls.emptyBoard[b] === textContent &&
        displayControls.emptyBoard[c] === textContent
      ) {
        return _changeStyleOnWin([a, b, c]);
      }
      if (displayControls.emptyBoard.every((cell) => cell != null)) {
        return console.log("draw");
      }
    }
  }

  /* Private Function for grid cell bg clr change on win*/
  function _changeStyleOnWin(winArray) {
    if (winArray) {
      winArray.forEach(
        (value) => (
          (displayControls.cells[value].style.background =
            displayControls.cellWinBgColor),
          (displayControls.cells[value].style.color =
            displayControls.cellWinTextColor)
        )
      );
    }
  }

  /* Public Function */
  function restartGame() {
    displayControls.emptyBoard.fill(null);
    displayControls.cells.forEach(
      (cell) => (
        (cell.textContent = ""),
        (cell.style.background = ""),
        (cell.style.color = "")
      )
    );
    players.defaultPlayer = players.playerX;
  }

  return { playerChoice, restartGame };
})();

displayControls.cells.forEach((cell) =>
  cell.addEventListener("click", gamePlayModule.playerChoice)
);

displayControls.restart.addEventListener("click", gamePlayModule.restartGame);
