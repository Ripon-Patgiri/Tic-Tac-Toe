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
const gameBoard = () => {
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
};

const blocks = document.getElementsByClassName("block");
for (let block = 0; block < blocks.length; block++) {
  blocks[block].addEventListener("click", (e) => {
    if (e.target.textContent !== "") return;
    for (let i = 0; i < blocks.length; i++) {
      console.log("1");
      blocks[i].textContent = "X";
    }
  });
}
