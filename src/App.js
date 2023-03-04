import React, { useState } from 'react';

const IN_PROGRESS = 1;
const FINISHED = 2;

function Square({ content, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {content}
    </button>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const squareValues = history[history.length - 1];

  function handlePlay(nextSquares) {
    let newHistory = history.slice();
    newHistory.push(nextSquares);
    setHistory(newHistory);
    setXIsNext(!xIsNext);
  }
  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext={xIsNext}
          squareValues={squareValues}
          onPlay={handlePlay}
        />
      </div>
      <div className='game-info'>
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squareValues, onPlay }) {
  let gameStateObject = getGameState(squareValues, xIsNext);
  let statusText = getGameStateMsg(gameStateObject);

  function handleSquareClick(i) {
    if (squareValues[i] || gameStateObject.state === FINISHED) {
      return;
    }
    const nextSquares = squareValues.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }
  return (
    <div>
      <div className='status'>{statusText}</div>
      <div className='board-row'>
        <Square
          content={squareValues[0]}
          onSquareClick={() => handleSquareClick(0)}
        />
        <Square
          content={squareValues[1]}
          onSquareClick={() => handleSquareClick(1)}
        />
        <Square
          content={squareValues[2]}
          onSquareClick={() => handleSquareClick(2)}
        />
      </div>
      <div className='board-row'>
        <Square
          content={squareValues[3]}
          onSquareClick={() => handleSquareClick(3)}
        />
        <Square
          content={squareValues[4]}
          onSquareClick={() => handleSquareClick(4)}
        />
        <Square
          content={squareValues[5]}
          onSquareClick={() => handleSquareClick(5)}
        />
      </div>
      <div className='board-row'>
        <Square
          content={squareValues[6]}
          onSquareClick={() => handleSquareClick(6)}
        />
        <Square
          content={squareValues[7]}
          onSquareClick={() => handleSquareClick(7)}
        />
        <Square
          content={squareValues[8]}
          onSquareClick={() => handleSquareClick(8)}
        />
      </div>
    </div>
  );
}

function getGameState(squares, xIsNext) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { state: FINISHED, winner: squares[a], nextPlayer: null };
    }
  }
  const available = (square) => square === null;

  return squares.some(available)
    ? { state: IN_PROGRESS, winner: null, nextPlayer: xIsNext ? 'X' : 'O' }
    : { state: FINISHED, winner: null, nextPlayer: null };
}

function getGameStateMsg(gameStateObject) {
  if (gameStateObject.state === IN_PROGRESS) {
    return `Next Player: ${gameStateObject.nextPlayer}`;
  } else if (gameStateObject.winner) {
    return `Winner is: ${gameStateObject.winner}`;
  }
  return 'Tied game!';
}
