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
};
