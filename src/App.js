import React, { useState } from 'react';

function Square({ content, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {content}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squareValues, setSquareValues] = useState(Array(9).fill(null));
  const winner = calculateWinner(squareValues);
  let statusText = winner
    ? `Winner is: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleSquareClick(i) {
    if (squareValues[i] || calculateWinner(squareValues)) {
      return;
    }
    const nextSquares = squareValues.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    setSquareValues(nextSquares);
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

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}
