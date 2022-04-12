/* Array & Array win combo */
const displayControls = (function () {
  const cells = document.querySelectorAll(".grid-item");
  const restart = document.querySelector(".restart-btn");
  const scoreBoard = document.querySelector(".score");
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
    scoreBoard,
  };
})();

const playerFactory = (name, score = 0) => {
  return { name, score };
};

const gamePlayModule = (() => {
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");
  const defaultPlayer = playerFactory(player1.name);
  let winArray = [];

  /* Public Function */
  function playerChoice() {
    if (!displayControls.emptyBoard[this.id] && !this.textContent) {
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
        winArray = [a, b, c];
        displayControls.cells.forEach((cell) =>
          cell.removeEventListener("click", gamePlayModule.playerChoice)
        );
        _addPointOnWinCondition(winArray);
        _changeFontAndBgStyleOnWin(winArray);
      }
      if (displayControls.emptyBoard.every((cell) => cell != null)) {
        console.log("draw");
      }
    }
  }

  /* Private Function */
  function _addPointOnWinCondition(array) {
    if (
      array.every(
        (value) => displayControls.cells[value].textContent === player1.name
      )
    ) {
      player1.score++;
      displayControls.scoreBoard.textContent = `${player1.score} : ${player2.score}`;
    } else if (
      array.every(
        (value) => displayControls.cells[value].textContent === player2.name
      )
    ) {
      player2.score++;
      displayControls.scoreBoard.textContent = `${player1.score} : ${player2.score}`;
    }
    _counterLimit();
  }

  /* Private Function */
  function _counterLimit() {
    if (player1.score >= 5) {
      console.log("player1 won");
    } else if (player2.score >= 3) {
      console.log("player2 won");
    }
  }

  /* Private Function for grid cell bg clr change on win*/
  function _changeFontAndBgStyleOnWin(winArray) {
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
