"use strict";

// Player Object to Manage Player Symbol
const Player = (symbol) => {
  this.symbol = symbol;

  const getSymbol = () => {
    return symbol;
  };

  return { getSymbol };
};

// gameBoard Object to till deal with Tic Tac Toe Board
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setBoard = (index, symbol) => {
    if (index > board.length) return;
    board[index] = symbol;
  };

  const getBoard = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setBoard, getBoard, reset };
})();

// Functions related to Displaying.
const displayController = (() => {
  // Extracting Buttons
  const blocks = document.querySelectorAll(".block");
  const msg = document.getElementById("message");
  const restartBtn = document.getElementById("restartBtn");

  //Functioning of Each Block in the Board
  blocks.forEach((block) =>
    block.addEventListener("click", (e) => {
      if (gameController.getIsComplete() || e.target.textContent !== "") return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameBoard();
    })
  );

  // Working of Restart Button
  restartBtn.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    updateGameBoard();
    setMessage("Turn - X");
  });

  const updateGameBoard = () => {
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].textContent = gameBoard.getBoard(i);
    }
  };

  const outputResult = (winner) => {
    if (winner === "Draw") {
      setMessage("It's a Draw!!");
    } else {
      setMessage(`${winner} has Won !!`);
    }
  };

  const setMessage = (message) => {
    msg.textContent = message;
  };

  return { outputResult, setMessage };
})();

// To Control the working of the game.
const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let isComplete = false;

  const playRound = (blockIndex) => {
    gameBoard.setBoard(blockIndex, getCurrentPlayerSymbol());
    if (checkWinner(blockIndex)) {
      displayController.outputResult(getCurrentPlayerSymbol());
      isComplete = true;
      return;
    }
    if (round === 9) {
      displayController.outputResult("Draw");
      isComplete = true;
      return;
    }
    round++;
    displayController.setMessage(`Turn - ${getCurrentPlayerSymbol()}`);
  };

  const getCurrentPlayerSymbol = () => {
    return round % 2 === 1 ? playerX.getSymbol() : playerO.getSymbol();
  };

  const checkWinner = (blockIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(blockIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getBoard(index) === getCurrentPlayerSymbol()
        )
      );
  };

  const getIsComplete = () => {
    return isComplete;
  };

  const reset = () => {
    round = 1;
    isComplete = false;
  };

  return { playRound, getIsComplete, reset };
})();
