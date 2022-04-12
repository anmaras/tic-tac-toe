/* Array & Array win combo */
const displayControls = (function () {
  const cells = Array.from(document.querySelectorAll(".grid-item"));
  const restart = document.querySelector(".restart-btn");
  const replay = document.querySelector(".replay-btn");
  const scoreBoard = document.querySelector(".score");
  const blackdrob = document.querySelector(".blackdrop");
  const cellWinBgColor = "grey";
  const cellWinTextColor = "White";
  const emptyBoard = Array(9).fill(null);
  const winMessage = document.querySelector(".winMsg");
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
    blackdrob,
    replay,
    winMessage,
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
        _removeEventListener();
        _addPointOnWinCondition(winArray);
        _changeFontAndBgStyleOnWin(winArray);
      } else if (
        !winArray.every(
          (input) => displayControls.cells[input].textContent === textContent
        ) &&
        displayControls.emptyBoard.every((cells) => cells !== null)
      ) {
        console.log("Draw");
      }
    }
  }

  function _removeEventListener() {
    displayControls.cells.forEach((cell) =>
      cell.removeEventListener("click", gamePlayModule.playerChoice)
    );
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
    const maxWins = 2;
    if (player1.score >= maxWins) {
      console.log("player1 won");
      _blackDropAddAndRestartBtn();
    } else if (player2.score >= maxWins) {
      console.log("player2 won");
      _blackDropAddAndRestartBtn();
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

  function _blackDropAddAndRestartBtn() {
    displayControls.blackdrob.classList.add("visible");
    displayControls.restart.classList.add("visible");
  }

  function _blackDropAndRestastRemove() {
    displayControls.blackdrob.classList.remove("visible");
    displayControls.restart.classList.remove("visible");
  }

  /* Public Function */
  function replay() {
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
    displayControls.scoreBoard.textContent = `${player1.score} : ${player2.score}`;
  }

  function restart() {
    replay();
    _blackDropAndRestastRemove();
    player1.score = 0;
    player2.score = 0;
    displayControls.scoreBoard.textContent = `${player1.score} : ${player2.score}`;
  }

  return { playerChoice, replay, restart };
})();

displayControls.cells.forEach((cell) =>
  cell.addEventListener("click", gamePlayModule.playerChoice)
);

displayControls.replay.addEventListener("click", gamePlayModule.replay);

displayControls.restart.addEventListener("click", gamePlayModule.restart);
