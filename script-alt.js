/* Array & Array win combo */
const displayControls = (function () {
  const playerXScore = document.querySelector(".player1").textContent;
  const playerOScore = document.querySelector(".player2").textContent;
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
    playerXScore,
    playerOScore,
  };
})();

const playerFactory = (name, score) => {
  return { name, score };
};

const gamePlayModule = (() => {
  let counter = 0;
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");
  const defaultPlayer = playerFactory(player1.name);

  /* Public Function */
  function playerChoice() {
    if (!displayControls.emptyBoard[this.id]) {
      displayControls.emptyBoard[this.id] = defaultPlayer.name;
      this.textContent = defaultPlayer.name;
      //tenary condition
      defaultPlayer.name =
        defaultPlayer.name == player1.name ? player2.name : player1.name;
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
        displayControls.cells.forEach((cell) =>
          cell.removeEventListener("click", gamePlayModule.playerChoice)
        );
        displayControls.restart.textContent = `Play again!`;

        return [a, b, c];
      }
      if (displayControls.emptyBoard.every((cell) => cell != null)) {
        return console.log("draw");
      }
    }
  }

  /* 
  function addCounterWin(array) {
    if (array.every((value) => (value = player1.name))) {
      counter++;
      displayControls.playerXScore.innerText = `Player X -${counter}-`;
    } else if (array.every((value) => (value = player2.name))) {
      counter++;
      displayControls.playerOScore.innerText = `Player O -${counter}-`;
    }
  }

 */
  /* Private Function for grid cell bg clr change on win*/
  /*   function _changeStyleOnWin(winArray) {
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
  } */

  /* Public Function */
  function restartGame() {
    displayControls.emptyBoard.fill(null);
    displayControls.cells.forEach(
      (cell) => (
        (cell.textContent = ""),
        (cell.style.background = ""),
        (cell.style.color = ""),
        cell.addEventListener("click", gamePlayModule.playerChoice)
      )
    );
    defaultPlayer.name = player1.name;
    displayControls.restart.textContent = "Restart";
  }

  return { playerChoice, restartGame };
})();

displayControls.cells.forEach((cell) =>
  cell.addEventListener("click", gamePlayModule.playerChoice)
);

displayControls.restart.addEventListener("click", gamePlayModule.restartGame);
